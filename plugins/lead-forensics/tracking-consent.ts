export async function setupTrackingConsentInLeadForensics({
  consentDecisionLoader,
}: {
  consentDecisionLoader: () => undefined | { analytics: boolean; marketing: boolean }
}) {
  const decision = consentDecisionLoader()

  if (decision?.analytics && decision?.marketing) {
    window.setupTrackingConsentInLeadForensics()
  }
}
