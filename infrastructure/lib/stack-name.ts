import type { Stack } from 'aws-cdk-lib'
import { envSpecificName } from './deploy-env'

export function deployEnvStackNameOf<TC extends { new (...args: any[]): T }, T extends Stack>(clazz: TC) {
  const stackName = clazz.name.replace(/Stack$/i, '')
  return envSpecificName(stackName)
}
