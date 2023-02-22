import glob from 'glob'
import { promisify } from 'util'
import { S3 } from '@aws-sdk/client-s3'
import { createReadStream } from 'fs'
import { cookieConsentEnabledPage } from './cookie-consent-html-marker'

const s3 = new S3({})

async function main() {
  const bucket = process.env.DEPLOY_S3_BUCKET_NAME
  if (!bucket) {
    throw new Error('No DEPLOY_S3_BUCKET_NAME set')
  }

  const indexHtmls = await promisify(glob)('public/**/index.html', {
    nodir: true,
    nocase: true,
  })

  await Promise.all(
    indexHtmls.map(async pagePath => {
      const hostedUri = pagePath.replace(/^public\//i, '')
      const pageKey = cookieConsentEnabledPage(hostedUri)
      await s3.putObject({
        Bucket: bucket,
        Key: pageKey,
        Body: createReadStream(pagePath, 'utf-8'),
        ContentType: 'text/html',
      })
    })
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

export {}
