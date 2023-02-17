import { envSpecificName } from './deploy-env'

export function visitorsTableName() {
  return envSpecificName('visitors')
}
