import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import { Cookies } from 'react-cookie-consent'

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
  gtag('consent', 'update', {
    ad_storage: getConsentGtag(isMarketingChecked),
    analytics_storage: getConsentGtag(isAnalitycsChecked),
  })
  initializeAndTrack(location)
}

export const onAllowAll = () => {
  localStorage.setItem(marketingConsentLSName, getConsentGtag(true))
  localStorage.setItem(analyticsConsentLSName, getConsentGtag(true))
  Cookies.set('gatsby-gdpr-hotjar', 'true', { expires: 365 })
  Cookies.set('gatsby-gdpr-facebook-pixel', 'true', { expires: 365 })
  gtag('consent', 'update', {
    ad_storage: acceptedResultLSConsent,
    analytics_storage: acceptedResultLSConsent,
  })
  initializeAndTrack(location)
}
