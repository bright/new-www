import React from 'react'
import { GatsbyBrowser, GatsbySSR } from 'gatsby'
import { isFbqDefined } from './fbq-or-fallback'
import { FacebookFqbScript } from './facebook-fqb-script'

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
