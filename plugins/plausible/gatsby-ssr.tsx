import { GatsbySSR } from 'gatsby'
import { PlausibleScript } from './plausible-script'
import React from 'react'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element, props }, options) => {
  return (
    <>
      {element}
      <PlausibleScript />
    </>
  )
}
