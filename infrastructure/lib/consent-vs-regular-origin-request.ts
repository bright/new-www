import { indexHtmlShowCookieConsentFile } from '../../src/analytics/html-show-cookie-consent-file-marker'

function handler(event: AWSCloudFrontFunction.Event) {
  // noinspection ES6ConvertVarToLetConst
  var request = event.request
  console.log(request)
  if (request.uri.endsWith('/') && typeof request.cookies?.['CookieConsent'] == 'undefined') {
    request.uri = request.uri + indexHtmlShowCookieConsentFile
  }
  return request
}
