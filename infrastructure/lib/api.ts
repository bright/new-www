import { CfnOutput, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  HttpApi,
  HttpMethod,
  MappingValue,
  ParameterMapping,
  PayloadFormatVersion
} from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration, HttpUrlIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { ebooksBucketName } from './ebooks-bucket-name'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { deployEnv } from './deploy-env'
import { OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { getresponseApiKeyParamName } from './getresponse-api-key-param-name'
import { thirdPartyProxyPath } from 'gatsby/dist/internal-plugins/partytown/proxy'
import { Runtime } from 'aws-cdk-lib/aws-lambda'

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

    const getresponseApiKey = StringParameter.fromSecureStringParameterAttributes(this, 'getresponse api key', {
      parameterName: getresponseApiKeyParamName,
    })
    getresponseApiKey.grantRead(ebookSignUp)

    props.visitorsTable.grantReadWriteData(ebookSignUp)

    this.ebooks.grantRead(ebookSignUp)

    this.httpApi.addRoutes({
      methods: [HttpMethod.POST],
      path: '/api/ebooks/{ebookName}/sign-up',
      integration: new HttpLambdaIntegration('ebooks-signup', ebookSignUp),
    })

    this.httpApi.addRoutes({
      methods: [HttpMethod.GET, HttpMethod.OPTIONS],
      path: thirdPartyProxyPath,

      integration: new HttpLambdaIntegration(
        'partytown-reverse-proxy',
        new NodejsFunction(this, 'partytown-reverse-proxy', {
          entry: './lib/partytown-reverse-proxy.ts',
          runtime: Runtime.NODEJS_18_X
        }),
        {
          payloadFormatVersion: PayloadFormatVersion.VERSION_2_0
        }
      ),
    })

    new CfnOutput(this, 'apiUrl', {
      value: this.httpApi.apiEndpoint,
    })
  }

  get apiUrl() {
    return this.httpApi.apiEndpoint
  }
}
