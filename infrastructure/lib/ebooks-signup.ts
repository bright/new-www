import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { visitorsTableName } from './visitors-table-name'
import { APIGatewayProxyResultV2 } from 'aws-lambda/trigger/api-gateway-proxy'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { S3 } from '@aws-sdk/client-s3'
import { ebooksBucketName } from './ebooks-bucket-name'

const dynamoDB = DynamoDBDocument.from(new DynamoDB({}))

const s3 = new S3({})

const ebooksLoader = (async () => {
  const books = await s3.listObjects({
    Bucket: ebooksBucketName(),
  })

  const ebooks = (books.Contents ?? []).map(object => ({ name: object.Key }))

  console.log('loaded', { ebooks })
  return ebooks
})()

function jsonResponse({ statusCode = 200, body }: { statusCode?: number; body: object }): APIGatewayProxyResultV2 {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  }
}

export const handler: APIGatewayProxyHandlerV2 = async event => {
  const { email, name, consent } = JSON.parse(event.body ?? '{}')

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

  const ebookToDownload = ebooks.find(e => e.name == ebookName)

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

  return jsonResponse({
    body: ebookToDownload,
  })
}
