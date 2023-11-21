import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { visitorsTableName } from './visitors-table-name'
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { S3 } from '@aws-sdk/client-s3'
import { ebooksBucketName } from './ebooks-bucket-name'
import { EbookSignUp200Response } from '../../api-client'
import { ebookBasename } from './ebook-basename'
import { SNS } from '@aws-sdk/client-sns'

const dynamoDB = DynamoDBDocument.from(new DynamoDB({}))

const s3 = new S3({})

const sns = new SNS({})

const ebooksLoader = (async () => {
  const books = await s3.listObjects({
    Bucket: ebooksBucketName(),
  })

  const ebooks = (books.Contents ?? []).map(object => ({
    name: object.Key!.replace(/.*\//g, ''),
    key: object.Key,
  }))

  console.log('loaded', { ebooks })
  return ebooks
})()

function jsonResponse<TResponseBody = object>({
  statusCode = 200,
  body,
}: {
  statusCode?: number
  body: TResponseBody
}): APIGatewayProxyResultV2 {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  }
}

export const handler: APIGatewayProxyHandlerV2 = async (event, context) => {
  const { email, name, consent } = JSON.parse(event.body ?? '{}')

  console.log('request', { headers: event.headers, context: context })
  console.log('context', context)
  const referrerUrl = event.headers['referer']

  if (!consent) {
    return jsonResponse({
      statusCode: 400,
      body: {
        message: 'User consent is required',
      },
    })
  }

  if (!email) {
    return jsonResponse({
      statusCode: 400,
      body: {
        message: 'User email is required',
      },
    })
  }

  if (!name) {
    return jsonResponse({
      statusCode: 400,
      body: {
        message: 'User name is required',
      },
    })
  }

  const ebookName = event.pathParameters?.ebookName

  if (!ebookName) {
    return jsonResponse({
      statusCode: 400,
      body: {
        message: 'ebookName is required',
      },
    })
  }

  const ebooks = await ebooksLoader

  const ebookToDownload = ebooks.find(e => ebookBasename(e.name) == ebookBasename(ebookName))

  if (!ebookToDownload) {
    return jsonResponse({
      statusCode: 400,
      body: {
        message: `No ebook found with name: ${ebookName}`,
      },
    })
  }

  await dynamoDB.put({
    TableName: visitorsTableName(),
    Item: {
      email,
      name,
      consent,
    },
  })

  console.log('Saved to dynamo')

  await sns.publish({
    TopicArn: process.env.EBOOK_SIGN_UPS_TOPIC_ARN,
    Message: JSON.stringify({ ebookName, email, name, referrerUrl })
  })

  console.log('Published to SNS')


  return jsonResponse<EbookSignUp200Response>({
    body: {
      ebook: {
        name: ebookName,
        url: `https://brightinventions.pl/ebooks/${ebookToDownload.name}`,
      },
    },
  })
}
