import { Stack } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb'
import { visitorsTableName } from './visitors-table-name'

export class Visitors extends Stack {
  readonly visitorsTable: Table

  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.visitorsTable = new Table(this, 'visitors', {
      tableName: visitorsTableName(),
      partitionKey: {
        name: 'email',
        type: AttributeType.STRING,
      },
    })
  }
}
