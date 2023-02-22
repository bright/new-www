import { siteUrl } from './src/site-metadata'

const SHOW_COOKIE_CONSENT_MARKER = '_showCookieConsent_'
const indexHtmlShowCookieConsentFile = `index${SHOW_COOKIE_CONSENT_MARKER}.html`

export function cookieConsentEnabledPage(relativeFilePath: string) {
  return relativeFilePath.replace(/(index)\.(html)$/i, indexHtmlShowCookieConsentFile)
}

export function cookieConsentEnabledUri(uri: string) {
  const url = new URL(uri, siteUrl)
  if (!url.pathname.endsWith('/')) {
    return uri
  }

  url.pathname = `${url.pathname}${indexHtmlShowCookieConsentFile}`

  console.log('Rewritten url', url)

  return url.pathname
}
