import { gtagOrFallback } from '../../plugins/google-gtag/gtag-or-fallback'
import { isProduction } from '../helpers/deployEnv'

interface CustomEventProps {
  category: string
  eventName: string
  label?: string
  value?: number
  nonInteraction?: boolean
}

export function trackCustomEvent(eventProps: CustomEventProps) {
  const gtagFun = gtagOrFallback(isProduction)

  const { label, category, ...rest } = eventProps

  gtagFun('event', eventProps.eventName, {
    event_label: eventProps.label,
    event_category: eventProps.category,
    ...rest,
  })
}

export async function trackConversion(eventProps: { sent_to: string }) {
  const gtagFun = gtagOrFallback(isProduction)

  return new Promise(resolve => {
    gtagFun('event', 'conversion', {
      send_to: eventProps.sent_to,
      event_callback: resolve,
    })
    if (!global.gtag) {
      resolve(void 0)
    }
  })
}

