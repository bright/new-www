export const ENV_SPECIFIC_BASE = 'BrightInventionsPl'

export function deployEnv() {
  const deployEnv = process.env.DEPLOY_ENV
  if (!deployEnv) {
    throw new Error(`No DEPLOY_ENV set`)
  }
  return deployEnv || 'production'
}

export function envSpecificName(logicalName: string) {
  return `${ENV_SPECIFIC_BASE}-${deployEnv()}-${logicalName}`
}
