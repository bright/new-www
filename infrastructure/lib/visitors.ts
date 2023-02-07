import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { UserPool } from 'aws-cdk-lib/aws-cognito'

export class Visitors extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    const visitors = new UserPool(this, '')
  }
}
