import { consentToGtagValue } from './consent-to-gtag-value'

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

export function applyConsentDecisionToGtag(
  decision: { analytics: boolean; marketing: boolean },
  gtag: Gtag.Gtag = global.gtag
) {
  const { marketing, analytics } = decision

  gtag('consent', 'update', {
    ad_storage: consentToGtagValue(marketing),
    analytics_storage: consentToGtagValue(analytics),
  })
}

export async function setupGtagTrackingConsent({
  consentDecisionLoader,
}: {
  consentDecisionLoader: () => undefined | { analytics: boolean; marketing: boolean }
}) {
  const gtag = await gtagLoader()
  const decision = consentDecisionLoader()
  if (decision) {
    applyConsentDecisionToGtag(decision, gtag)
  }
}
