import React from 'react'
import { GatsbySSR } from 'gatsby'
import { GoogleGtagScript } from './google-gtag-script'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }, options) => {
  return (
    <>
      {element}
      <GoogleGtagScript options={options} />
    </>
  )
}
