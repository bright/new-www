/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { GlobalStyle } from './src/styles/global'
import { registerGlobalMailtoClickHandler } from './src/report-mailto-click-to-google-analytics'
import { setupTrackingConsentInPixel } from './plugins/facebook-pixel/tracking-consent'
import { loadConsentDecision } from './src/analytics/local-storage-constants'
import { setupGtagTrackingConsent } from './plugins/google-gtag/tracking-consent'
import { setupTrackingConsentInHotjar } from './plugins/hotjar/tracking-consent'
import { setupTrackingConsentInLinkedIn } from './plugins/linkedin-pixel/tracking-consent'
import { CookieConsentContextWrapper } from './src/analytics/contextual-cookie-consent'
import i18n from 'i18next'
import { useSSR } from 'react-i18next'
import { i18nForPageContext, i18nResources, withI18next } from './src/i18n'

let nextRoute = ''

export const onPreRouteUpdate: GatsbyBrowser['onPreRouteUpdate'] = ({ location }) => {
  nextRoute = location.pathname
}

window.addEventListener('unhandledrejection', event => {
  if (/loading chunk \d* failed./i.test(event.reason)) {
    if (nextRoute) {
      window.location.pathname = nextRoute
    }
  }
})

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props: { pageContext } }) => {
  return withI18next(i18nForPageContext(pageContext))(
    <>
      <GlobalStyle />
      {element}
    </>
  )
}

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <CookieConsentContextWrapper>{element}</CookieConsentContextWrapper>
)

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] = () => {
  registerGlobalMailtoClickHandler()
}

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  setupGtagTrackingConsent({
    consentDecisionLoader: loadConsentDecision,
  }).catch(console.error)

  setupTrackingConsentInPixel({
    consentDecisionLoader: loadConsentDecision,
  }).catch(console.error)

  setupTrackingConsentInHotjar({
    consentDecisionLoader: loadConsentDecision,
  }).catch(console.error)

  setupTrackingConsentInLinkedIn({
    consentDecisionLoader: loadConsentDecision,
  }).catch(console.error)
}
