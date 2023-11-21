import { CfnOutput, Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { HttpApi, HttpMethod, PayloadFormatVersion } from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { ebooksBucketName } from './ebooks-bucket-name'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { deployEnv, envSpecificName } from './deploy-env'
import { OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { getresponseApiKeyParamName } from './getresponse-api-key-param-name'
import { thirdPartyProxyPath } from 'gatsby/dist/internal-plugins/partytown/proxy'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { productionDomainNames, stagingDomainNames } from './domain-names'
import { CorsHttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha/lib/http/api'
import { Topic } from 'aws-cdk-lib/aws-sns'
import { Queue } from 'aws-cdk-lib/aws-sqs'
import { SqsSubscription } from 'aws-cdk-lib/aws-sns-subscriptions'
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'

interface ApiProps {
  visitorsTable: Table
}

function ebookSignUpsTopicName() {
  return envSpecificName('ebook-sign-ups')
}

export class Api extends Stack {
  private httpApi: HttpApi
  readonly ebooks: Bucket
  readonly ebooksOriginAccessIdentity: OriginAccessIdentity
  private ebookSignUps: Topic

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id)

    const productionOrigins = productionDomainNames.map(n => `https://${n}`)
    const stagingOrigins = stagingDomainNames.map(n => `https://${n}`)
    this.httpApi = new HttpApi(this, 'api', {
      corsPreflight: {
        allowHeaders: ['content-type', 'referer'],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ['http://0.0.0.0:8000', ...productionOrigins, ...stagingOrigins],
      },
    })

    this.ebooksOriginAccessIdentity = new OriginAccessIdentity(this, 'cf oai', {
      comment: 'EBooks S3 access is restricted',
    })

    this.ebooks = new Bucket(this, 'ebooks-storage', {
      bucketName: ebooksBucketName(),
    })
    this.ebooks.grantRead(this.ebooksOriginAccessIdentity)

    this.ebookSignUps = new Topic(this, 'ebook-signups', {
      topicName: ebookSignUpsTopicName(),
    })

    const registerInGetResponseOnSignUp = new Queue(this, 'register-in-get-response-on-ebook-sign-up')

    this.ebookSignUps.addSubscription(
      new SqsSubscription(registerInGetResponseOnSignUp, {
        rawMessageDelivery: true,
      })
    )

    const registerInGetResponse = new NodejsFunction(this, 'register-in-get-response', {
      entry: './lib/register-in-get-response.ts',
      environment: {
        DEPLOY_ENV: deployEnv(),
        EBOOK_SIGN_UPS_TOPIC_ARN: this.ebookSignUps.topicArn,
      },
    })

    const getresponseApiKey = StringParameter.fromSecureStringParameterAttributes(this, 'getresponse api key', {
      parameterName: getresponseApiKeyParamName,
    })
    getresponseApiKey.grantRead(registerInGetResponse)

    registerInGetResponse.addEventSource(new SqsEventSource(registerInGetResponseOnSignUp))

    const ebookSignUp = new NodejsFunction(this, 'ebooks-signup', {
      entry: './lib/ebooks-signup.ts',
      memorySize: 1024,
      environment: {
        DEPLOY_ENV: deployEnv(),
        EBOOK_SIGN_UPS_TOPIC_ARN: this.ebookSignUps.topicArn,
      },
    })

    props.visitorsTable.grantReadWriteData(ebookSignUp)

    this.ebooks.grantRead(ebookSignUp)
    this.ebookSignUps.grantPublish(ebookSignUp)

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
          runtime: Runtime.NODEJS_18_X,
        }),
        {
          payloadFormatVersion: PayloadFormatVersion.VERSION_2_0,
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
