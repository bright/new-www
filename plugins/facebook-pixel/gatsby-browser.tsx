import { GatsbyBrowser } from 'gatsby'

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = args => {
  if (typeof global?.fbq === 'function') {
    fbq('track', 'PageView') // TODO: PageView vs ViewContent
  }
}
