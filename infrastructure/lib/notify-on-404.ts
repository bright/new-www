import { S3Handler } from 'aws-lambda/trigger/s3'
import { S3, SESV2 } from 'aws-sdk'
import { createGunzip } from 'zlib'
import { createLogger } from 'bunyan'
import { ScheduledHandler } from 'aws-lambda/trigger/cloudwatch-events'
import { ObjectList } from 'aws-sdk/clients/s3'
import { DateTime } from 'luxon'
import { CloudFrontLogEntry } from './cloud-front-log-entry'
import { renderNotFoundEntries } from './render-not-found-entries'

const s3BucketName = process.env.BUCKET_NAME!
const s3BucketKeysPrefix = process.env.BUCKET_KEYS_PREFIX!
const scheduleInMinutes = parseInt(process.env.SCHEDULE_RATE_MINUTES!)

const CloudFrontParser = require('cloudfront-log-parser')

const s3 = new S3()
const ses = new SESV2()

const log = createLogger({
  name: 'handler',
  level: 'debug',
})

function parseAccessLogEntries({ gzippedContent }: { gzippedContent: Buffer }): Promise<CloudFrontLogEntry[]> {
  return new Promise(resolve => {
    const parser = new CloudFrontParser({ format: 'web' })
    const entries: CloudFrontLogEntry[] = []

    parser.on('readable', function () {
      let access: CloudFrontLogEntry
      while ((access = parser.read())) {
        entries.push(access)
      }
      resolve(entries)
    })
    const gunzip = createGunzip()
    gunzip.pipe(parser)
    gunzip.end(gzippedContent)
  })
}

export const find404InS3AccessLogCreated: S3Handler = async event => {
  for (const record of event.Records) {
    const data = await s3
      .getObject({
        Key: record.s3.object.key,
        Bucket: record.s3.bucket.name,
      })
      .promise()

    const entries = await parseAccessLogEntries({ gzippedContent: data.Body as Buffer })
    const notFoundEntries = entries.filter(entry => entry['sc-status'] === '404').filter(entry => !shouldIgnore(entry))
    log.info({ notFoundEntries }, 'Not found entries')
  }
}

async function getAllS3ObjectsWithPrefix({ prefix }: { prefix: string }) {
  const result: ObjectList[] = []
  let nextToken: string | undefined
  do {
    const objects = await s3
      .listObjectsV2({
        Bucket: s3BucketName,
        Prefix: prefix,
        ContinuationToken: nextToken,
      })
      .promise()
    result.push(objects?.Contents ?? [])
    nextToken = objects.NextContinuationToken
  } while (nextToken)
  return result
}

function getAccessLogObjectsPrefixes({ now }: { now: DateTime } = { now: DateTime.now() }) {
  let previous = now.minus({ minutes: scheduleInMinutes }).startOf('hour')
  let prefixes: string[] = []
  while (previous < now) {
    prefixes.push(s3BucketKeysPrefix + previous.toFormat('yyyy-MM-dd-HH'))
    previous = previous.plus({ hour: 1 })
  }
  return prefixes
}

async function getObject(object: S3.Object) {
  const data = await s3
    .getObject({
      Key: object.Key!,
      Bucket: s3BucketName,
    })
    .promise()
  return data
}

async function* parseEntries(objects: S3.Object[]) {
  for (const object of objects) {
    const content = (await getObject(object)).Body! as Buffer
    const accessLogEntries = await parseAccessLogEntries({ gzippedContent: content })
    for (const entry of accessLogEntries) {
      yield entry
    }
  }
}

function uriPath(entry: CloudFrontLogEntry) {
  return entry['cs-uri-stem']
}

function shouldIgnore(entry: CloudFrontLogEntry) {
  const ignoreUserAgent = ['PetalBot'].some(ignorable => entry['cs-user-agent']?.includes(ignorable) == true)
  const ignorePath = ['favicon', 'robots.txt', 'wp-includes', '/.svn/', '/.git/', '/wp-login.php'].some(
    ignorable => uriPath(entry)?.includes(ignorable) == true
  )
  return ignoreUserAgent || ignorePath
}

async function findAccessLogsToProcess() {
  const prefixes = getAccessLogObjectsPrefixes()
  log.debug({ prefixes }, 'Will fetch objects')

  const allObjectsSinceYesterday = (
    await Promise.all(
      prefixes.map(prefix =>
        getAllS3ObjectsWithPrefix({
          prefix: prefix,
        })
      )
    )
  ).flat(2)
  return allObjectsSinceYesterday
}

async function findNotFoundEntriesInAccessLogs(allObjectsSinceYesterday: S3.Object[]) {
  const notFoundEntries: CloudFrontLogEntry[] = []
  for await (const entry of parseEntries(allObjectsSinceYesterday)) {
    const isNotFound = entry['sc-status'] == '404'
    const ignore = shouldIgnore(entry)
    if (isNotFound && !ignore) {
      notFoundEntries.push(entry)
    }
  }
  // TODO: deduplicate by path?
  log.info({ notFoundEntries })
  return notFoundEntries
}

async function sendNotificationEmail(notFoundEntries: CloudFrontLogEntry[]) {
  await ses
    .sendEmail({
      Destination: {
        ToAddresses: [
          'piotr.mionskowski@brightinventions.pl',
          'ula.stankiewicz@brightinventions.pl',
          'izabela.pawlik@brightinventions.pl',
        ],
      },
      FromEmailAddress: 'piotr@brightinventions.pl',
      Content: {
        Simple: {
          Subject: {
            Data: 'Not found urls found on brightinventions.pl',
          },
          Body: {
            Html: {
              Data: renderNotFoundEntries({ notFoundEntries }),
            },
          },
        },
      },
    })
    .promise()
}

export const find404InS3OnSchedule: ScheduledHandler = async event => {
  const filesToCheck = await findAccessLogsToProcess()

  log.info({ filesToCheck })

  const notFoundEntries = await findNotFoundEntriesInAccessLogs(filesToCheck)

  if (notFoundEntries.length > 0) {
    await sendNotificationEmail(notFoundEntries)
  }
}
