import * as cdk from '@aws-cdk/core'
import { CfnOutput, Construct } from '@aws-cdk/core'
import { Certificate, ValidationMethod } from '@aws-cdk/aws-certificatemanager'
import { productionDomainNames, stagingDomainNames } from './domain-names'

export class CloudFrontCertificates extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, 'BrightInventionsPlCloudFrontCertificates', { env: { region: 'us-east-1' } })
    const domainNames = productionDomainNames.concat(stagingDomainNames)
    const certificate = new Certificate(this, 'CustomDomainCertificate', {
      domainName: domainNames[0],
      subjectAlternativeNames: domainNames.filter((_, ix) => ix > 0),
      validationMethod: ValidationMethod.DNS
    })

    new CfnOutput(this, 'CertificateArn', {
      value: certificate.certificateArn
    })
  }
}
