import { consentToGtagValue } from './consent-to-gtag-value'
import { gtagLoader } from './gtag-loader'

export function applyConsentDecisionToGtag(decision: { analytics: boolean; marketing: boolean }, gtag: Gtag.Gtag) {
  const { marketing, analytics } = decision

  gtag('consent', 'update', {
    ad_storage: consentToGtagValue(marketing),
    ad_user_data: consentToGtagValue(marketing),
    ad_personalization: consentToGtagValue(marketing),
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
