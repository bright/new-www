import { Script } from 'gatsby'
import { siteUrl } from '../../src/site-metadata'
import React from 'react'

export function PlausibleScript() {
  return (
    <Script src={'https://plausible.brightinventions.pl/js/script.js'} strategy='idle' data-domain={siteUrl.hostname} />
  )
}
