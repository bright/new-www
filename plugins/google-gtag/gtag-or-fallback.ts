const loggingGtag: Gtag.Gtag = (...args: any[]) => {
  console.log('gtag not available. Would track', args)
}

export function gtagOrFallback(isProduction: boolean = false): Gtag.Gtag {
  if (isProduction && typeof gtag == 'undefined') {
    console.error('No gtag available. Please check gatsby-plugin-google-gtag configuration')
  }

  const gtagFun = gtag ?? loggingGtag
  return gtagFun
}
