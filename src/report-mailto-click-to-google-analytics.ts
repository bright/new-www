import { trackCustomEvent } from './analytics/track-custom-event'

export function registerGlobalMailtoClickHandler() {
  document.addEventListener('click', function(e) {
    const a = e.target
    if (a instanceof HTMLAnchorElement && a.href.startsWith('mailto:')) {
      const email = a.href.replace('mailto:', '')
      const linkText = a.innerText
      trackCustomEvent({
        category: 'Mailto Clicked',
        eventName: email,
        label: linkText
      })
    }
  }, {
    capture: true
  })
}
