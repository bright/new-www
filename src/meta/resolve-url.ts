import { siteMetadata } from '../../gatsby-config'

export function resolveUrl(pathname: string) {
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname
  }
  return new URL(pathname, siteMetadata.siteUrl).toString()
}
