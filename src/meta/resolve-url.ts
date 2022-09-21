import { siteMetadata } from '../site-metadata'

export function resolveUrl(pathname: string) {
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname
  }
  return new URL(pathname, siteMetadata.siteUrl).toString()
}
