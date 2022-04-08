import { trackCustomEvent } from './helpers/trackCustomEvent'

export function registerGlobalMailtoClickHandler() {
  document.addEventListener('click', function(e) {
    const a = e.target
    if (a instanceof HTMLAnchorElement && a.href.startsWith('mailto:')) {
      const email = a.href.replace('mailto:', '')
      const linkText = a.innerText
      trackCustomEvent({
        category: 'Mailto Clicked',
        action: email,
        label: linkText
      })
    }
  }, {
    capture: true
  })
}
