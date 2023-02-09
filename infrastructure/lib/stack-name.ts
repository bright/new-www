import { Stack } from 'aws-cdk-lib'

export const STACK_NAME_BASE = 'BrightInventionsPl'

function deployEnv() {
  const deployEnv = process.env.DEPLOY_ENV
  if (!deployEnv) {
    throw new Error(`No DEPLOY_ENV set`)
  }
  return deployEnv || 'production'
}

export function deployEnvStackNameOf<TC extends { new (...args: any[]): T }, T extends Stack>(clazz: TC) {
  const stackName = clazz.name.replace(/Stack$/i, '')
  return `${STACK_NAME_BASE}-${deployEnv()}-${stackName}`
}
