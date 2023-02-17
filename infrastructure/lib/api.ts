import { CfnOutput, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { ebooksBucketName } from './ebooks-bucket-name'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { deployEnvStackNameOf } from './stack-name'
import { deployEnv } from './deploy-env'

interface ApiProps {
  visitorsTable: Table
}

export class Api extends Stack {
  private httpApi: HttpApi

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id)

    this.httpApi = new HttpApi(this, 'api', {})

    const ebooks = new Bucket(this, 'ebooks-storage', {
      bucketName: ebooksBucketName(),
    })

    const ebookSignUp = new NodejsFunction(this, 'ebooks-signup', {
      entry: './lib/ebooks-signup.ts',
      environment: {
        DEPLOY_ENV: deployEnv(),
      },
    })

    props.visitorsTable.grantReadWriteData(ebookSignUp)
    ebooks.grantRead(ebookSignUp)

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
