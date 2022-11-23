function pixelLoader(): Promise<facebook.Pixel.Event> {
  return new Promise((resolve, reject) => {
    const fbq = window.fbq
    if (fbq) {
      resolve(fbq)
    }
    document.addEventListener('DOMContentLoaded', () => {
      const fbq = window.fbq
      if (fbq) {
        resolve(fbq)
      } else {
        reject('window.fbq not defined after DOMContentLoaded')
      }
    })
  })
}

export function applyConsentDecisionToPixel(
  decision: { analytics: boolean; marketing: boolean },
  fbq: facebook.Pixel.Event = global.fbq
) {
  const { marketing, analytics } = decision

  if (marketing || analytics) {
    // TODO: marketing vs analytics
    fbq('consent', 'grant')
  }
}

export async function setupPixelTrackingConsent({
  consentDecisionLoader,
}: {
  consentDecisionLoader: () => undefined | { analytics: boolean; marketing: boolean }
}) {
  const fbq = await pixelLoader()
  const decision = consentDecisionLoader()
  if (decision) {
    applyConsentDecisionToPixel(decision, fbq)
  }
}
