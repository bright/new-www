/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import type { GatsbySSR } from 'gatsby'
import * as fs from 'fs'

import { GlobalStyle } from './src/styles/global'
import { CookieConsentContextWrapper } from './src/analytics/contextual-cookie-consent'
import { thirdPartyProxyPath } from 'gatsby/dist/internal-plugins/partytown/proxy'
import { partytownAllowedHosts, partytownEnabled } from './src/partytown'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  const visibleByDefault = process.env.COOKIE_CONSENT_EAGER_RENDER_ENABLED === 'true'
  return <CookieConsentContextWrapper visibleByDefault={visibleByDefault}>{element}</CookieConsentContextWrapper>
}

const partytownAllowedHosts = ['www.google-analytics.com', 'www.googletagmanager.com']

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }, options) => {
  const files = getFilesFromPath('./public/static', '.woff2')
  const preload = [
    'montserrat-v24-latin-ext_latin-regular',
    'montserrat-v24-latin-ext_latin-600',
    'montserrat-v23-latin-700',
    'montserrat-v23-latin-800',
    'montserrat-v23-latin-ext_latin-900',
    'lato-v23-latin-ext_latin-regular',
    'lato-v23-latin-ext_latin-700',
    'lato-v23-latin-ext_latin-900',
  ]

  console.log({ options })

  setHeadComponents([
    // ...files.map((file, i) => {
    //   return preload.map((font, key) => {
    //     const fileBeginning = file.split('-').slice(0, -1).join('-')
    //     if (fileBeginning === font) {
    //       return (
    //         <link
    //           key={key}
    //           rel='preload'
    //           as='font'
    //           type='font/woff2'
    //           crossOrigin='anonymous'
    //           href={`/static/${file}`}
    //         />
    //       )
    //     } else {
    //       return null
    //     }
    //   })
    // }),
    partytownEnabled ? (
      <script
        key='partytown-vanilla-config'
        dangerouslySetInnerHTML={{
          __html: `
        partytown = {
           debug: false,
           set(opts){
              // https://github.com/BuilderIO/partytown/issues/72#issuecomment-1383790146
              let sessionStorage = opts.window && opts.window.sessionStorage;
              
              let isGtmTagDefinedInUrl = opts.window && opts.window.location && opts.window.location.search.includes("gtm_debug");
              let isGtmTagDefinedInSessionStorage = sessionStorage && sessionStorage.getItem('isConnectedToGtagDebugger') == 'true'
              let isDebugging = isGtmTagDefinedInUrl || isGtmTagDefinedInSessionStorage; 
              if ( isDebugging && opts.name === "type" && opts.nodeName === "SCRIPT" ) { 
                return opts.prevent; 
              } {
                return opts.continue;
              } 
           },
           resolveUrl(url, location) {
              let allowedHosts = new Set(${JSON.stringify(partytownAllowedHosts)});
              if (allowedHosts.has(url.hostname)) {
                // Use a secure connection
                if (url?.protocol === 'http:') {
                  url = new URL(url.href.replace('http', 'https'))
                }

                // Point to our proxied URL
                const proxyUrl = new URL(location.origin + '${thirdPartyProxyPath}')
                proxyUrl.searchParams.append('url', url)

                return proxyUrl
              }

              return url
           }
         }`,
        }}
      />
    ) : null,
  ])
}

function getFilesFromPath(path: string, extension: string) {
  let dir = fs.readdirSync(path)
  return dir.filter(elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')))
}
