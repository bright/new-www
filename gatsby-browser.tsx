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

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)

function gtagLoader(): Promise<Gtag.Gtag> {
  return new Promise((resolve, reject) => {
    const gtag = window.gtag as Gtag.Gtag
    if (gtag) {
      resolve(gtag)
    }
    document.addEventListener('DOMContentLoaded', () => {
      if (gtag) {
        resolve(gtag)
      } else {
        reject('window.gtag not defined after DOMContentLoaded')
      }
    })
  })
}

function hasUserDecidedOnConsent() {
  const adStorageConsent = localStorage.getItem('ad_storage')
  const analyticsStorageConsent = localStorage.getItem('analytics_storage')
  return adStorageConsent || analyticsStorageConsent
}

async function setupGoogleTrackingConsent() {
  const gtag = await gtagLoader().then(res => res)
  if (!hasUserDecidedOnConsent()) {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    })
  } else {
    const adStorageConsent = localStorage.getItem('ad_storage')
    const analyticsStorageConsent = localStorage.getItem('analytics_storage')

    gtag('consent', 'update', {
      ad_storage: adStorageConsent === 'granted' ? adStorageConsent : 'denied',
      analytics_storage: analyticsStorageConsent === 'granted' ? analyticsStorageConsent : 'denied',
    })
  }
}

export const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] = () => {
  registerGlobalMailtoClickHandler()
  setupGoogleTrackingConsent()
}
