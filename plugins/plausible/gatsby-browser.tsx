import { GatsbyBrowser } from 'gatsby'
import React from 'react'
import { PlausibleScript } from './plausible-script'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }, options) => {
  return (
    <>
      {element}
      <PlausibleScript />
    </>
  )
}
