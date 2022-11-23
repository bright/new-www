import { Cookies } from 'react-cookie-consent'
import { gtagOrFallback } from './track-custom-event'
import { applyConsentDecisionToPixel } from '../../plugins/facebook-pixel/tracking-consent'

export const marketingConsentLSName = 'ad_storage'
export const analyticsConsentLSName = 'analytics_storage'
export const acceptedResultLSConsent = 'granted'
export const rejectedResultLSConsent = 'denied'

const getConsentGtag = (isChecked: boolean) => {
  if (isChecked) {
    return acceptedResultLSConsent
  } else {
    return rejectedResultLSConsent
  }
}

export const hasUserDecidedOnAnalyticsConsentCookieName = 'CookieConsent'

export const onAllowSelected = (isMarketingChecked: boolean, isAnalitycsChecked: boolean) => {
  localStorage.setItem(marketingConsentLSName, getConsentGtag(isMarketingChecked))
  localStorage.setItem(analyticsConsentLSName, getConsentGtag(isAnalitycsChecked))

  Cookies.set(hasUserDecidedOnAnalyticsConsentCookieName, 'true', { expires: 365 })

  Cookies.set('gatsby-gdpr-hotjar', `${isAnalitycsChecked}`, { expires: 365 })
  Cookies.set('gatsby-gdpr-facebook-pixel', `${isMarketingChecked}`, { expires: 365 })

  gtagOrFallback()('consent', 'update', {
    ad_storage: getConsentGtag(isMarketingChecked),
    analytics_storage: getConsentGtag(isAnalitycsChecked),
  })

  applyConsentDecisionToPixel({
    analytics: isAnalitycsChecked,
    marketing: isMarketingChecked,
  })
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
