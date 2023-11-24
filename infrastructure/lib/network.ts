import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Vpc } from 'aws-cdk-lib/aws-ec2'

export class Network extends Stack {
  readonly vpc: Vpc

  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.vpc = new Vpc(this, 'vpc', {
      natGateways: 0,
    })
  }
}
