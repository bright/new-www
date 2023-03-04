import { isFbqDefined } from './fbq-or-fallback'
import { delay } from '../../src/delay'

function isScriptElement(n: any): n is HTMLScriptElement {
  return n instanceof HTMLScriptElement
}

function isPartytownScript(s: HTMLScriptElement) {
  return s.hasAttribute('data-partytown')
}

function pixelLoader(): Promise<facebook.Pixel.Event> {
  return new Promise((resolve, reject) => {
    if (isFbqDefined()) {
      resolve(fbq)
    }
    document.addEventListener('DOMContentLoaded', async () => {
      if (isFbqDefined()) {
        resolve(fbq)
      } else {

        const observer = new MutationObserver(mutations => {
          const addedScripts = mutations
            .filter(m => m.type == 'childList')
            .flatMap(m => Array.from(m.addedNodes))
            .filter(isScriptElement)

          const partyTown = addedScripts.find(isPartytownScript)

          if (partyTown) {
            observer.disconnect()

            if (isFbqDefined()) {
              resolve(fbq)
            } else {
              reject('window.fbq not defined after partytown')
            }
          }
        })

        observer.observe(document.querySelector('head')!, {
          childList: true,
        })

        let currentWaitTimeMillis = 0
        const maxWaitMillis = 1000
        while (currentWaitTimeMillis < maxWaitMillis) {
          const waitTime = 100
          await delay({ millis: waitTime })
          if (isFbqDefined()) {
            observer.disconnect()
            resolve(fbq)
            return
          }
          currentWaitTimeMillis += waitTime
        }

        reject('window.fbq not defined after DOMContentLoaded')
      }
    })
  })
}

export function applyConsentDecisionToPixel(
  decision: { analytics: boolean; marketing: boolean },
  fbq: facebook.Pixel.Event = global.fbq
) {
  const { marketing } = decision

  if (marketing) { // pixel is used for marketing/ads
    fbq('consent', 'grant')
  }
}

export async function setupTrackingConsentInPixel({
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
