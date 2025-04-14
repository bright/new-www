import { envSpecificName } from './deploy-env'

export function resourcesBucketName() {
  return envSpecificName('resources').toLowerCase()
}
