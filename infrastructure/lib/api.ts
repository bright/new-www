import { CfnOutput, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { ebooksBucketName } from './ebooks-bucket-name'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { deployEnv } from './deploy-env'
import { OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront'

interface ApiProps {
  visitorsTable: Table
}

export class Api extends Stack {
  private httpApi: HttpApi
  readonly ebooks: Bucket
  readonly ebooksOriginAccessIdentity: OriginAccessIdentity

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id)

    this.httpApi = new HttpApi(this, 'api', {})

    this.ebooksOriginAccessIdentity = new OriginAccessIdentity(this, 'cf oai', {
      comment: 'EBooks S3 access is restricted',
    })

    this.ebooks = new Bucket(this, 'ebooks-storage', {
      bucketName: ebooksBucketName(),
    })

    this.ebooks.grantRead(this.ebooksOriginAccessIdentity)

    const ebookSignUp = new NodejsFunction(this, 'ebooks-signup', {
      entry: './lib/ebooks-signup.ts',
      environment: {
        DEPLOY_ENV: deployEnv(),
      },
    })

    props.visitorsTable.grantReadWriteData(ebookSignUp)
    this.ebooks.grantRead(ebookSignUp)

    this.httpApi.addRoutes({
      methods: [HttpMethod.POST],
      path: '/api/ebooks/{ebookName}/sign-up',
      integration: new HttpLambdaIntegration('ebooks-signup', ebookSignUp),
    })

    new CfnOutput(this, 'apiUrl', {
      value: this.httpApi.apiEndpoint,
    })
  }

  get apiUrl() {
    return this.httpApi.apiEndpoint
  }
}
