import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { IncomingMessage } from 'http'
import { request as httpsRequest } from 'https'
import { googleTrackingIds } from '../../src/google-tracking-ids'
import { googleTagManagerUrl } from '../../plugins/google-gtag/google-tag-manager-url'

async function request(params: { method: string; url: string; headers: { [name: string]: string | undefined } }) {
  return new Promise<{ response: IncomingMessage; data: Buffer }>((resolve, reject) => {
    const { host, ...headers } = params.headers
    const request = httpsRequest(
      params.url,
      {
        method: params.method,
        headers: headers,
      },
      res => {
        const data: any[] = []
        const statusCode = res.statusCode ?? 0
        if (statusCode < 200 || statusCode >= 300) {
          reject(`Response returned status code ${statusCode}`)
          return
        }

        res.on('data', chunk => data.push(chunk))
        res.on('end', () =>
          resolve({
            response: res,
            data: Buffer.concat(data),
          })
        )
      }
    )

    request.on('error', reject)

    request.end()
  })
}

const allowedUris = new Set([
  googleTagManagerUrl(googleTrackingIds('production')[0]),
  googleTagManagerUrl(googleTrackingIds('staging')[0]),
])

export const handler: APIGatewayProxyHandlerV2 = async event => {
  console.log({ event })
  console.log({ requestContext: event.requestContext })
  const url = event.queryStringParameters?.['url']
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No url passed in query string params' }),
    }
  }
  if (!allowedUris.has(url)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'The url passed in is not whitelisted' }),
    }
  }
  const { response, data } = await request({
    method: event.requestContext.http.method,
    url: url,
    headers: event.headers,
  })

  return {
    statusCode: response.statusCode ?? 500,
    headers: response.headers as any,
    isBase64Encoded: true,
    body: data.toString('base64'),
  }
}
