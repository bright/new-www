import * as cdk from '@aws-cdk/core'
import { CfnOutput } from '@aws-cdk/core'
import { Bucket } from '@aws-cdk/aws-s3'
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
  OriginProtocolPolicy,
  ViewerCertificate
} from '@aws-cdk/aws-cloudfront'
import { Effect, PolicyStatement, User } from '@aws-cdk/aws-iam'
import { domainNames } from './domain-names'
import { Certificate } from '@aws-cdk/aws-certificatemanager'

interface WebsiteProps {
  certificateArn: string
}

export class Website extends cdk.Stack {
  constructor(scope: cdk.Construct, props: WebsiteProps) {
    super(scope, 'BrightInventionsPl')

    const originAccessIdentity = new OriginAccessIdentity(this, 'cloudfront access')
    const user = new User(this, 'GithubPagesDeploymentUser', {
      userName: 'brightinventions-pl-deployer'
    })

    const bucket = new Bucket(this, 'bucket', {
      bucketName: 'brightinventions-pl-website-content'
    })

    bucket.grantRead(originAccessIdentity)

    bucket.grantReadWrite(user)

    // required for static website hosting
    bucket.grantPublicAccess()

    user.addToPolicy(new PolicyStatement({
      actions: ['s3:PutBucketWebsite'],
      resources: [bucket.bucketArn],
      effect: Effect.ALLOW
    }))
    user.addToPolicy(new PolicyStatement({
      actions: ['s3:PutObjectAcl'],
      resources: [bucket.bucketArn, bucket.arnForObjects("*")],
      effect: Effect.ALLOW
    }))

    const certificate = Certificate.fromCertificateArn(this, 'certificate', props.certificateArn)

    const webDistribution = new CloudFrontWebDistribution(this, 'distribution', {
      originConfigs: [{
        // we don't use s3 origin as gatsby-s3-deploy features will not work
        // however if we don't use gatsby-s3-deploy server side redirects
        // we can get this to work by mapping 403 and 401 in CF to index.html
        customOriginSource: {
          domainName: bucket.bucketWebsiteDomainName,
          originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY
        },
        behaviors: [{
          isDefaultBehavior: true
        }]
      }],
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: domainNames
      })
    })

    new CfnOutput(this, 'DistributionId', {
      value: webDistribution.distributionId
    })
  }
}
