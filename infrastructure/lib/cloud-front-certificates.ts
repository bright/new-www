import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CfnOutput } from 'aws-cdk-lib'
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager'
import { productionDomainNames, stagingDomainNames } from './domain-names'

export class CloudFrontCertificates extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, 'BrightInventionsPlCloudFrontCertificates', { env: { region: 'us-east-1' } })
    const domainNames = productionDomainNames.concat(stagingDomainNames)
    const certificate = new Certificate(this, 'CustomDomainCertificate', {
      domainName: domainNames[0],
      subjectAlternativeNames: domainNames.filter((_, ix) => ix > 0),
      validation: CertificateValidation.fromDns(),
    })

    new CfnOutput(this, 'CertificateArn', {
      value: certificate.certificateArn,
    })
  }
}
