import * as cdk from '@aws-cdk/core'
import { CfnOutput } from '@aws-cdk/core'
import { Bucket } from '@aws-cdk/aws-s3'
import { CloudFrontWebDistribution, OriginAccessIdentity, ViewerCertificate } from '@aws-cdk/aws-cloudfront'
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

    user.addToPolicy(new PolicyStatement({
      actions: ['s3:PutBucketWebsite'],
      resources: [bucket.bucketArn],
      effect: Effect.ALLOW
    }))

    const certificate = Certificate.fromCertificateArn(this, 'certificate', props.certificateArn)

    const webDistribution = new CloudFrontWebDistribution(this, 'distribution', {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: originAccessIdentity
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
