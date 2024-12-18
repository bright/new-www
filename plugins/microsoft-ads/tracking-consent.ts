export async function setupTrackingConsentMicrosoftAds({
  consentDecisionLoader,
}: {
  consentDecisionLoader: () => undefined | { analytics: boolean; marketing: boolean }
}) {
  const decision = consentDecisionLoader()

  if (decision?.analytics && decision?.marketing) {
    window.initMicrosoftAds()
  }
}
