import { isProduction } from './deployEnv'

interface CustomEventProps {
  category: string
  action: string
  label?: string
  value?: number
  nonInteraction?: boolean
}

const loggingGtag: Gtag.Gtag = (...args: any[]) => {
  console.log('gtag not available. Would track', args)
}

export function trackCustomEvent(eventProps: CustomEventProps) {
  const gtagFun = gtagOrFallback()

  const { label, category, ...rest } = eventProps

  gtagFun('event', eventProps.action, {
    event_label: eventProps.label,
    event_category: eventProps.category,
    ...rest,
  })
}

export async function trackConversion(eventProps: { sent_to: string }) {
  const gtagFun = gtagOrFallback()

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

export function gtagOrFallback(): Gtag.Gtag {
  if (isProduction && !global.gtag) {
    console.error('No gtag available. Please check gatsby-plugin-google-gtag configuration')
  }

  // @ts-ignore
  const gtagFun = global.gtag ? gtag : loggingGtag
  return gtagFun
}
