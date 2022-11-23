function initHotjarLoader(): Promise<typeof window.initHotjar> {
  return new Promise((resolve, reject) => {
    const initHotjar = window.initHotjar
    if (initHotjar) {
      resolve(initHotjar)
    }
    document.addEventListener('DOMContentLoaded', () => {
      const initHotjar = window.initHotjar
      if (initHotjar) {
        resolve(initHotjar)
      } else {
        reject('window.initHotjar not defined after DOMContentLoaded')
      }
    })
  })
}

function initHotjarOrFallback() {
  return (
    window.initHotjar ??
    (() => {
      console.log('No initHotjar available')
    })
  )
}

export function applyConsentDecisionToHotjar(
  decision: { analytics: boolean; marketing: boolean },
  initHotjar: typeof window.initHotjar = initHotjarOrFallback()
) {
  const { analytics } = decision

  if (analytics) { // hotjar is used for analytics
    initHotjar()
  }
}

export async function setupTrackingConsentInHotjar({
  consentDecisionLoader,
}: {
  consentDecisionLoader: () => undefined | { analytics: boolean; marketing: boolean }
}) {
  const initHotjar = await initHotjarLoader()
  const decision = consentDecisionLoader()
  if (decision) {
    applyConsentDecisionToHotjar(decision, initHotjar)
  }
}
