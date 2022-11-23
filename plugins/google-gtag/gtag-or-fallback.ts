const loggingGtag: Gtag.Gtag = (...args: any[]) => {
  console.log('gtag not available. Would track', args)
}

export function gtagOrFallback(isProduction: boolean = false): Gtag.Gtag {
  if (isProduction && !global.gtag) {
    console.error('No gtag available. Please check gatsby-plugin-google-gtag configuration')
  }

  const gtagFun = global?.gtag ?? loggingGtag
  return gtagFun
}
