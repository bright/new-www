import { GatsbyBrowser } from 'gatsby'

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = args => {
  const location = args.location
  // directly from gatsby-plugin-google-gtag
  const sendPageView = function sendPageView() {
    const pagePath = location ? location.pathname + location.search + location.hash : undefined
    window.gtag('event', 'page_view', {
      page_path: pagePath,
    })
  }

  if ('requestAnimationFrame' in window) {
    requestAnimationFrame(function () {
      requestAnimationFrame(sendPageView)
    })
  } else {
    // simulate 2 rAF calls
    setTimeout(sendPageView, 32)
  }
}
