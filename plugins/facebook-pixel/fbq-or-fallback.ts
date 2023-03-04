const loggingFbq: facebook.Pixel.Event = (...args: any[]) => {
  console.log('fbq not available. Would track', args)
}

export function fbqOrFallback(isProduction: boolean = false): facebook.Pixel.Event {
  if (isProduction && !isFbqDefined()) {
    console.error('No fbq available. Please check facebook-pixel plugin configuration')
  }

  const fqbFun = isFbqDefined() ? fbq : loggingFbq;
  return fqbFun
}

export function isFbqDefined() {
  return typeof fbq != 'undefined'
}
