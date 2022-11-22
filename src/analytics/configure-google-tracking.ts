import {
  acceptedResultLSConsent,
  analyticsConsentLSName,
  hasUserDecidedOnConsent,
  marketingConsentLSName,
  rejectedResultLSConsent,
} from './local-storage-constants'

function gtagLoader(): Promise<Gtag.Gtag> {
  return new Promise((resolve, reject) => {
    const gtag = window.gtag
    if (gtag) {
      resolve(gtag)
    }
    document.addEventListener('DOMContentLoaded', () => {
      if (gtag) {
        resolve(gtag)
      } else {
        reject('window.gtag not defined after DOMContentLoaded')
      }
    })
  })
}

export async function setupGoogleTrackingConsent() {
  const gtag = await gtagLoader()
  if (!hasUserDecidedOnConsent()) {
    gtag('consent', 'default', {
      ad_storage: rejectedResultLSConsent,
      analytics_storage: rejectedResultLSConsent,
    })
  } else {
    const adStorageConsent = localStorage.getItem(marketingConsentLSName)
    const analyticsStorageConsent = localStorage.getItem(analyticsConsentLSName)

    gtag('consent', 'update', {
      ad_storage: adStorageConsent === acceptedResultLSConsent ? adStorageConsent : rejectedResultLSConsent,
      analytics_storage:
        analyticsStorageConsent === acceptedResultLSConsent ? analyticsStorageConsent : rejectedResultLSConsent,
    })
  }
}
