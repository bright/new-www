import * as cdk from 'aws-cdk-lib'
import { Arn, CfnOutput, Duration, RemovalPolicy } from 'aws-cdk-lib'
import { Bucket, IBucket } from 'aws-cdk-lib/aws-s3'
import cloudfront, {
  Behavior,
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution, FunctionCode,
  FunctionEventType,
  OriginAccessIdentity,
  OriginProtocolPolicy,
  SourceConfiguration,
  ViewerCertificate,
  Function as CloudfrontFunction,
  PriceClass
} from 'aws-cdk-lib/aws-cloudfront'
import { Effect, PolicyStatement, User } from 'aws-cdk-lib/aws-iam'
import { productionDomainNames, stagingDomainNames } from './domain-names'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { Rule, Schedule } from 'aws-cdk-lib/aws-events'
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets'
import { Construct } from 'constructs'
import { ENV_SPECIFIC_BASE } from './deploy-env'
import { EsbuildProvider } from '@mrgrain/cdk-esbuild'
import * as fs from 'fs'
import path from 'path'
import { thirdPartyProxyPath } from 'gatsby/dist/internal-plugins/partytown/proxy'

interface WebsiteProps {
  certificateArn: string
  ebooksBucket: IBucket
  ebooksOriginAccessIdentity: OriginAccessIdentity
  prefix?: string
  apiUrl: string
}

export class Website extends cdk.Stack {
  constructor(scope: Construct, props: WebsiteProps) {
    super(scope, ENV_SPECIFIC_BASE)

    const originAccessIdentity = new OriginAccessIdentity(this, 'cloudfront access')
    const user = new User(this, 'GithubPagesDeploymentUser', {
      userName: 'brightinventions-pl-deployer',
    })

    const productionBucket = new Bucket(this, 'bucket', {
      bucketName: 'brightinventions-pl-website-content',
    })

    const stagingBucket = new Bucket(this, 'staging-bucket', {
      bucketName: 'brightinventions-pl-website-content-staging',
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const gatsbyContentBuckets = [productionBucket, stagingBucket]

    gatsbyContentBuckets.forEach(bucket => {
      bucket.grantRead(originAccessIdentity)

      bucket.grantReadWrite(user)

      // required for static website hosting
      bucket.grantPublicAccess()

      user.addToPolicy(
        new PolicyStatement({
          actions: ['s3:PutBucketWebsite'],
          resources: [bucket.bucketArn],
          effect: Effect.ALLOW,
        })
      )
      user.addToPolicy(
        new PolicyStatement({
          actions: ['s3:PutObjectAcl'],
          resources: [bucket.bucketArn, bucket.arnForObjects('*')],
          effect: Effect.ALLOW,
        })
      )
    })

    const certificate = Certificate.fromCertificateArn(this, 'certificate', props.certificateArn)

    const accessLogs = new Bucket(this, 'Access Logs', {
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: 'brightinventions-pl-access-logs',
    })
    const cloudfrontAccessLogPrefix = 'brightinventions-pl/cloudfront'

    const apiEndPointUrlWithoutProtocol = cdk.Fn.select(1, cdk.Fn.split('://', props.apiUrl))
    const apiEndPointDomainName = cdk.Fn.select(0, cdk.Fn.split('/', apiEndPointUrlWithoutProtocol))

    const ebooksDownloadOrigin: SourceConfiguration = {
      s3OriginSource: {
        s3BucketSource: props.ebooksBucket,
        originAccessIdentity: props.ebooksOriginAccessIdentity,
      },
      behaviors: [
        {
          pathPattern: '/ebooks/*', // this prefix must match ebooks s3 bucket content
        },
      ],
    }

    const apiOrigin: SourceConfiguration = {
      customOriginSource: {
        domainName: apiEndPointDomainName,
        originProtocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
      },
      behaviors: [
        {
          allowedMethods: CloudFrontAllowedMethods.ALL,
          pathPattern: '/api/*',
          forwardedValues: {
            queryString: true,
            headers: ['referer'],
          },
        },
        {
          allowedMethods: CloudFrontAllowedMethods.ALL,
          pathPattern: thirdPartyProxyPath,
          forwardedValues: {
            queryString: true,
          },
        },
      ],
    }

    const preserveUriParametersOnRedirectPath = path.resolve(
      path.join(process.cwd(), 'lib', 'preserve-uri-parameters-on-redirect.ts')
    )
    EsbuildProvider.defaultBuildProvider().buildSync({
      entryPoints: [preserveUriParametersOnRedirectPath],
      bundle: true,
      sourcemap: false,
      minify: false,
      treeShaking: false,
      outfile: pathWithExt(preserveUriParametersOnRedirectPath, '.js'),
      platform: 'node',
    })
    const preserveUriParametersOnRedirectCompiled = fs.readFileSync(pathWithExt(preserveUriParametersOnRedirectPath, '.js'), 'utf-8')

    const staticContentBehavior: Behavior = {
      isDefaultBehavior: true,
      forwardedValues: {
        queryString: false,
      },
      functionAssociations: [
        {
          eventType: FunctionEventType.VIEWER_RESPONSE,
          function: new CloudfrontFunction(this, 'preserve-uri-parameters-on-redirect', {
            code: FunctionCode.fromInline(preserveUriParametersOnRedirectCompiled),
          }),
        }
      ]
    }

    const productionWebDistribution = new CloudFrontWebDistribution(this, 'distribution', {
      priceClass: PriceClass.PRICE_CLASS_ALL,
      originConfigs: [
        ebooksDownloadOrigin,
        apiOrigin,
        {
          // we don't use s3 origin as gatsby-s3-deploy features will not work
          // however if we don't use gatsby-s3-deploy server side redirects
          // we can get this to work by mapping 403 and 401 in CF to index.html
          customOriginSource: {
            domainName: productionBucket.bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [staticContentBehavior],
        },
      ],
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: productionDomainNames,
      }),
      loggingConfig: {
        bucket: accessLogs,
        prefix: cloudfrontAccessLogPrefix,
      },
    })

    const stagingWebDistribution = new CloudFrontWebDistribution(this, 'staging-distribution', {
      priceClass: PriceClass.PRICE_CLASS_ALL,
      originConfigs: [
        ebooksDownloadOrigin,
        apiOrigin,
        {
          // we don't use s3 origin as gatsby-s3-deploy features will not work
          // however if we don't use gatsby-s3-deploy server side redirects
          // we can get this to work by mapping 403 and 401 in CF to index.html
          customOriginSource: {
            domainName: stagingBucket.bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [
            staticContentBehavior,
          ],
        },
      ],
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: stagingDomainNames,
      }),
      loggingConfig: {
        bucket: accessLogs,
        prefix: cloudfrontAccessLogPrefix,
      },
    })

    const scheduleRate = Duration.days(1)

    const notifyOn404 = new NodejsFunction(this, 'notify-on-404', {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, 'notify-on-404.ts'),
      handler: 'find404InS3OnSchedule',
      timeout: Duration.minutes(1),
      environment: {
        BUCKET_NAME: accessLogs.bucketName,
        BUCKET_KEYS_PREFIX: `${cloudfrontAccessLogPrefix}/${productionWebDistribution.distributionId}.`,
        SCHEDULE_RATE_MINUTES: scheduleRate.toMinutes().toString(),
      },
    })

    notifyOn404.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ses:SendEmail'],
        resources: ['*'],
      })
    )

    accessLogs.grantRead(notifyOn404)

    // we could use s3 notification
    // but the logs files are created very often
    // and we'd need to pay more than if we parse the logs on schedule
    // accessLogs.addObjectCreatedNotification(new LambdaDestination(notifyOn404), {
    //       prefix: cloudfrontAccessLogPrefix,
    //     })
    new Rule(this, 'Parse Access Logs', {
      schedule: Schedule.rate(scheduleRate),
      targets: [new LambdaFunction(notifyOn404)],
    })

    user.addToPolicy(
      new PolicyStatement({
        actions: ['cloudfront:CreateInvalidation'],
        resources: [
          Arn.format(
            {
              resource: 'distribution',
              service: 'cloudfront',
              resourceName: productionWebDistribution.distributionId,
              region: '',
            },
            this
          ),
          Arn.format(
            {
              resource: 'distribution',
              service: 'cloudfront',
              resourceName: stagingWebDistribution.distributionId,
              region: '',
            },
            this
          ),
        ],
      })
    )

    new CfnOutput(this, 'ProductionDistributionId', {
      value: productionWebDistribution.distributionId,
    })

    new CfnOutput(this, 'StagingDistributionId', {
      value: stagingWebDistribution.distributionId,
    })

    new CfnOutput(this, 'ProductionDistributionDomainName', {
      value: productionWebDistribution.distributionDomainName,
    })

    new CfnOutput(this, 'StagingDistributionDomainName', {
      value: stagingWebDistribution.distributionDomainName,
    })
  }
}

function pathWithExt(filePath: string, ext: string ) {
  return path.format({ ...path.parse(filePath), base: '', ext })
}
