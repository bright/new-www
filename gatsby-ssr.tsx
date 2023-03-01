/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import * as React from 'react'
import type { GatsbySSR } from 'gatsby'
import * as fs from 'fs'

import { GlobalStyle } from './src/styles/global'
import { CookieConsentContextWrapper } from './src/analytics/contextual-cookie-consent'
import { thirdPartyProxyPath } from 'gatsby/dist/internal-plugins/partytown/proxy'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  const visibleByDefault = process.env.COOKIE_CONSENT_EAGER_RENDER_ENABLED === 'true'
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}
export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  const visibleByDefault = process.env.COOKIE_CONSENT_EAGER_RENDER_ENABLED === 'true'
  return (
    <CookieConsentContextWrapper visibleByDefault={visibleByDefault}>
      {element}
    </CookieConsentContextWrapper>
  )
}

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

  setHeadComponents([
  ...files.map((file, i) => {
      return preload.map((font, key) => {
        const fileBeginning = file.split('-').slice(0, -1).join('-')
        if (fileBeginning === font) {
          return (
            <link
              key={key}
              rel='preload'
              as='font'
              type='font/woff2'
              crossOrigin='anonymous'
              href={`/static/${file}`}
            />
          )
        } else {
          return null
        }
      })
    }),
    <script
      key="partytown-vanilla-config"
      dangerouslySetInnerHTML={{
        __html: `
        let allowedHosts = new Set(['www.google-analytics.com', 'www.googletagmanager.com']);
        partytown = {
           debug: true,
           resolveUrl(url, location) {
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
    />,
  ])
}

function getFilesFromPath(path: string, extension: string) {
  let dir = fs.readdirSync(path)
  return dir.filter(elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')))
}
