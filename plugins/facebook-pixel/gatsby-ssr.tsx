import React from 'react'
import { GatsbySSR } from 'gatsby'
import { FacebookFqbScript } from './facebook-fqb-script'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }, options) => {
  return (
    <>
      {element}
      <FacebookFqbScript options={options} />
    </>
  )
}
