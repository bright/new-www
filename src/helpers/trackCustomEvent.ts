import { isProduction } from './deployEnv'

interface CustomEventProps {
  category: string
  action: string
  label?: string
  value?: number
  nonInteraction?: boolean
}

const loggingGtag = (command: 'event',
                     eventName: Gtag.EventNames | string,
                     eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams) => {
  console.log('trackCustomEvent', { command, eventName, eventParams })
}

export function trackCustomEvent(eventProps: CustomEventProps) {
  const { label, category, ...rest } = eventProps
  if (isProduction && !global.gtag) {
    console.error('No gtag available. Please check gatsby-plugin-google-gtag configuration')
  }
  // @ts-ignore
  const gtagFun = global.gtag ? gtag : loggingGtag

  gtagFun('event', eventProps.action, {
    event_label: eventProps.label,
    event_category: eventProps.category,
    ...rest
  })
}
