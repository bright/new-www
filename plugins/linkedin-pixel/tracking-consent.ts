export function applyConsentDecisionToLinkedIn(
  decision: { analytics: boolean; marketing: boolean }
) {
  const { analytics, marketing } = decision

  if (analytics && marketing) {
    window.initLinkedIn?.();
  }
}

export async function setupTrackingConsentInLinkedIn({ consentDecisionLoader }: {
  consentDecisionLoader: () => undefined | { analytics: boolean; marketing: boolean }
}) {
  const decision = consentDecisionLoader()

  if (decision) {
    applyConsentDecisionToLinkedIn(decision)
  }
}