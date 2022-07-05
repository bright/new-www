/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import * as React from 'react'
import * as fs from 'fs'

import { GlobalStyle } from './src/styles/global'

export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)

export function onRenderBody({ setHeadComponents }) {
  const files = getFilesFromPath('./public/static', '.woff2')
  const preload = [
    'montserrat-v24-latin-ext_latin-regular',
    'montserrat-v23-latin-600',
    'montserrat-v23-latin-700',
    'montserrat-v23-latin-800',
    'montserrat-v23-latin-ext_latin-900',
    'lato-v22-latin-ext_latin-regular',
    'lato-v22-latin-700',
  ]

  setHeadComponents([
    files.map((file, i) => {
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
        }
      })
    }),
  ])
}

function getFilesFromPath(path, extension) {
  let dir = fs.readdirSync(path)
  return dir.filter(elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')))
}
