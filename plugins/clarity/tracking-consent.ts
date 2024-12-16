export async function setupTrackingConsentClarity({
  consentDecisionLoader,
}: {
  consentDecisionLoader: () => undefined | { analytics: boolean; marketing: boolean }
}) {
  const decision = consentDecisionLoader()

  if (decision?.analytics) {
    window.initClarity()
  }
}
