function isScriptElement(n: any): n is HTMLScriptElement {
  return n instanceof HTMLScriptElement
}

export function gtagLoader(): Promise<Gtag.Gtag> {
  return new Promise((resolve, reject) => {
    if (typeof gtag != 'undefined') {
      resolve(gtag)
    }

    document.addEventListener('DOMContentLoaded', () => {
      if (typeof gtag != 'undefined') {
        resolve(gtag)
      } else {
        const observer = new MutationObserver(mutations => {
          const addedScripts = mutations
            .filter(m => m.type == 'childList')
            .flatMap(m => Array.from(m.addedNodes))
            .filter(isScriptElement)

          const partyTown = addedScripts.filter(s => s.hasAttribute('data-partytown'))[0]

          if (partyTown) {
            observer.disconnect()

            if (typeof gtag != 'undefined') {
              resolve(gtag)
            } else {
              reject('window.gtag not defined after DOMContentLoaded')
            }
          }
        })

        observer.observe(document.querySelector('head')!, {
          childList: true
        })
      }
    })
  })
}
