import { CloudFrontRequestHandler } from 'aws-lambda/trigger/cloudfront-request'

export const handler: CloudFrontRequestHandler = async event => {
  const request = event.Records[0].cf.request

  request.uri = request.uri?.replace('api/ebooks/download/', '')

  return request
}
