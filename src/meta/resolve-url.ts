import config from '../../gatsby-config'

export function resolveUrl(pathname: string) {
  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    return pathname
  }
  return new URL(pathname, config.siteMetadata.siteUrl).toString()
}
