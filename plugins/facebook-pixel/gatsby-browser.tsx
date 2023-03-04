import { GatsbyBrowser, GatsbySSR } from 'gatsby'
import { isFbqDefined } from './fbq-or-fallback'
import { FacebookFqbScript } from './facebook-fqb-script'
import React from 'react'

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = args => {
  if (isFbqDefined()) {
    fbq('track', 'PageView') // TODO: PageView vs ViewContent
  }
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }, options) => {
  return (
    <>
      {element}
      <FacebookFqbScript options={options} />
    </>
  )
}
