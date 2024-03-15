import { Cookies } from 'react-cookie-consent'
import { applyConsentDecisionToPixel } from '../../plugins/facebook-pixel/tracking-consent'
import { acceptedResultLSConsent, consentToGtagValue } from '../../plugins/google-gtag/consent-to-gtag-value'
import { applyConsentDecisionToGtag } from '../../plugins/google-gtag/tracking-consent'
import { gtagOrFallback } from '../../plugins/google-gtag/gtag-or-fallback'
import { isProduction } from '../helpers/deployEnv'
import { fbqOrFallback } from '../../plugins/facebook-pixel/fbq-or-fallback'
import { applyConsentDecisionToHotjar } from '../../plugins/hotjar/tracking-consent'
import { hasUserDecidedOnAnalyticsConsentCookieName } from './has-user-decided-on-analytics-consent-cookie-name'
import { applyConsentDecisionToLinkedIn } from '../../plugins/linkedin-pixel/tracking-consent'

export const marketingConsentLSName = 'ad_storage'
export const analyticsConsentLSName = 'analytics_storage'

export const onAllowSelected = (isMarketingChecked: boolean, isAnalitycsChecked: boolean) => {
  localStorage.setItem(marketingConsentLSName, consentToGtagValue(isMarketingChecked))
  localStorage.setItem(analyticsConsentLSName, consentToGtagValue(isAnalitycsChecked))

  Cookies.set(hasUserDecidedOnAnalyticsConsentCookieName, 'true', { expires: 365 })

  Cookies.set('gatsby-gdpr-hotjar', `${isAnalitycsChecked}`, { expires: 365 })
  Cookies.set('gatsby-gdpr-facebook-pixel', `${isMarketingChecked}`, { expires: 365 })

  const decision = {
    analytics: isAnalitycsChecked,
    marketing: isMarketingChecked,
  }

  applyConsentDecisionToGtag(decision, gtagOrFallback(isProduction))
  applyConsentDecisionToPixel(decision, fbqOrFallback(isProduction))
  applyConsentDecisionToHotjar(decision)
  applyConsentDecisionToLinkedIn(decision)
}

export const onAllowAll = () => {
  onAllowSelected(true, true)
}

export function loadConsentsStateOrDefault() {
  const analyticsStorage = global.localStorage?.getItem(analyticsConsentLSName)
  const adStorage = global.localStorage?.getItem(marketingConsentLSName)

  return {
    analytics: analyticsStorage === acceptedResultLSConsent,
    marketing: adStorage === acceptedResultLSConsent,
  }
}

export function loadConsentDecision() {
  if (hasUserDecidedOnConsent()) {
    return loadConsentsStateOrDefault()
  } else {
    return undefined
  }
}

export function hasUserDecidedOnConsent() {
  return Cookies.get(hasUserDecidedOnAnalyticsConsentCookieName) !== undefined
}
