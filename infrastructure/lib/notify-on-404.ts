import { S3Handler } from 'aws-lambda/trigger/s3'
import { S3 } from 'aws-sdk'
import { createGunzip } from 'zlib'
import { createLogger } from 'bunyan'
import { ScheduledHandler } from 'aws-lambda/trigger/cloudwatch-events'
import { ObjectList } from 'aws-sdk/clients/s3'
import { DateTime } from 'luxon'

const CloudFrontParser = require('cloudfront-log-parser')

const s3 = new S3()
const log = createLogger({
  name: 'handler',
  level: 'debug',
})

function parseEntries(body: Buffer): Promise<CloudFrontLogEntry[]> {
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
    gunzip.end(body)
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

    const entries = await parseEntries(data.Body as Buffer)
    const notFoundEntries = entries
      .filter(entry => entry['sc-status'] === '404')
      .filter(entry => !entry['cs-uri-stem']?.includes('favicon'))
    log.info({ notFoundEntries }, 'Not found entries')
  }
}

const s3BucketName = process.env.BUCKET_NAME!
const s3BucketKeysPrefix = process.env.BUCKET_KEYS_PREFIX!
const scheduleInMinutes = parseInt(process.env.SCHEDULE_RATE_MINUTES!)

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

export const find404InS3OnSchedule: ScheduledHandler = async event => {
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
  ).flat()

  log.info({ filesToCheck: allObjectsSinceYesterday })

  allObjectsSinceYesterday.map(object => await getObject(object))
}

const sampleEvent = {
  date: '2021-06-28',
  time: '18:35:45',
  'x-edge-location': 'CDG50-P1',
  'sc-bytes': '38868',
  'c-ip': '188.241.83.110',
  'cs-method': 'GET',
  'cs-host': 'd2u4rh35bofsuw.cloudfront.net',
  'cs-uri-stem': '/images/favicon-32x32.png',
  'sc-status': '404',
  'cs-referer': '-',
  'cs-user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
  'cs-uri-query': '-',
  'cs-cookie': '-',
  'x-edge-result-type': 'Error',
  'x-edge-request-id': '-mfD4Yc9SH3mTGX9TCP9VCxouZe_Ryecva2JwfGk9c8ETft0RQ1cwA==',
  'x-host-header': 'brightinventions.pl',
  'cs-protocol': 'https',
  'cs-bytes': '166',
  'time-taken': '0.093',
  'x-forwarded-for': '-',
  'ssl-protocol': 'TLSv1.3',
  'ssl-cipher': 'TLS_AES_128_GCM_SHA256',
  'x-edge-response-result-type': 'Error',
  'cs-protocol-version': 'HTTP/2.0',
  'fle-status': '-',
  'fle-encrypted-fields': '-',
  'c-port': '37590',
  'time-to-first-byte': '0.083',
  'x-edge-detailed-result-type': 'Error',
  'sc-content-type': 'text/html',
  'sc-content-len': '-',
  'sc-range-start': '-',
  'sc-range-end': '-',
}
type CloudFrontLogEntry = typeof sampleEvent
