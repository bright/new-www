import { indexHtmlShowCookieConsentFile } from './html-show-cookie-consent-file-marker'

export function cookieConsentEnabledPage(relativeFilePath: string) {
  return relativeFilePath.replace(/(index)\.(html)$/i, indexHtmlShowCookieConsentFile)
}
