import { envSpecificName } from './deploy-env'

export function ebooksBucketName() {
  return envSpecificName('ebooks').toLowerCase()
}
