const loggingFbq: facebook.Pixel.Event = (...args: any[]) => {
  console.log('fbq not available. Would track', args)
}

export function fbqOrFallback(isProduction: boolean = false): facebook.Pixel.Event {
  if (isProduction && !global.fbq) {
    console.error('No fbq available. Please check facebook-pixel plugin configuration')
  }

  const fqbFun = global?.fbq ?? loggingFbq
  return fqbFun
}
