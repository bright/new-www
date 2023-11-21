import { SQSHandler } from 'aws-lambda/trigger/sqs'
import { registerUserInGetresponse } from './getresponse-api'

export const handler: SQSHandler = async event => {
  const { ebookName, email, name, referrerUrl } = JSON.parse(event.Records[0].body)
  await registerUserInGetresponse({ ebookName, email, name, referrerUrl })
}
