import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import { Cookies } from 'react-cookie-consent'
import { gtagOrFallback } from '../../analytics/track-custom-event'

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

export const onAllowSelected = (isMarketingChecked: boolean, isAnalitycsChecked: boolean) => {
  localStorage.setItem(marketingConsentLSName, getConsentGtag(isMarketingChecked))
  localStorage.setItem(analyticsConsentLSName, getConsentGtag(isAnalitycsChecked))
  Cookies.set('gatsby-gdpr-hotjar', `${isAnalitycsChecked}`, { expires: 365 })
  Cookies.set('gatsby-gdpr-facebook-pixel', `${isMarketingChecked}`, { expires: 365 })
  gtagOrFallback()('consent', 'update', {
      ad_storage: getConsentGtag(isMarketingChecked),
      analytics_storage: getConsentGtag(isAnalitycsChecked),
    })
  initializeAndTrack(location)
}

export const onAllowAll = () => {
  onAllowSelected(true, true)
}
