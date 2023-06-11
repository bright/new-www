const loggingGtag: Gtag.Gtag = (...args: any[]) => {
  console.log('gtag not available. Would track', args)
}

export function gtagOrFallback(isProduction: boolean = false): Gtag.Gtag {
  const isGtagDefined = typeof gtag != 'undefined'
  if (isProduction && isGtagDefined) {
    console.error('No gtag available. Please check gatsby-plugin-google-gtag configuration')
  }

  return isGtagDefined ? gtag : loggingGtag
}
