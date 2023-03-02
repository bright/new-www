import { delay } from '../../src/delay'

function isScriptElement(n: any): n is HTMLScriptElement {
  return n instanceof HTMLScriptElement
}

async function delay({ ms }: { ms: number }) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isGtagDefined() {
  return typeof gtag != 'undefined'
}

function isPartytownScript(s: HTMLScriptElement) {
  return s.hasAttribute('data-partytown')
}

export function gtagLoader(): Promise<Gtag.Gtag> {
  return new Promise((resolve, reject) => {
    if (isGtagDefined()) {
      resolve(gtag)
    }

    document.addEventListener('DOMContentLoaded', async () => {
      if (isGtagDefined()) {
        resolve(gtag)
      } else {
        const observer = new MutationObserver(mutations => {
          const addedScripts = mutations
            .filter(m => m.type == 'childList')
            .flatMap(m => Array.from(m.addedNodes))
            .filter(isScriptElement)

          const partyTown = addedScripts.find(isPartytownScript)

          if (partyTown) {
            observer.disconnect()

            if (isGtagDefined()) {
              resolve(gtag)
            } else {
              reject('window.gtag not defined after DOMContentLoaded')
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
          await delay({ ms: waitTime })
          if (isGtagDefined()) {
            observer.disconnect()
            resolve(gtag)
            return
          }
          currentWaitTimeMillis += waitTime
        }

        if (!isGtagDefined()) {
          observer.disconnect()
          reject(`window.gtag not defined after waiting for ${maxWaitMillis / 1000}s`)
        }
      }
    })
  })
}
