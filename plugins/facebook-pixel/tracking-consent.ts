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
  decision: { anlystics: boolean; marketing: boolean },
  fbq: facebook.Pixel.Event = global.fbq
) {
  const { marketing, anlystics } = decision

  if (marketing || anlystics) {
    // TODO: marketing vs analytics
    fbq('consent', 'grant')
  }
}

export async function setupPixelTrackingConsent({
  consentDecisionLoader,
}: {
  consentDecisionLoader: () => undefined | { anlystics: boolean; marketing: boolean }
}) {
  const fbq = await pixelLoader()
  const decision = consentDecisionLoader()
  if (decision) {
    applyConsentDecisionToPixel(decision, fbq)
  }
}
