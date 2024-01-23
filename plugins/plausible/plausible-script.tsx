import { Script, ScriptStrategy } from 'gatsby'
import { siteUrl } from '../../src/site-metadata'
import React from 'react'

export function PlausibleScript() {
  return (
    <>
      <Script src={'https://plausible.brightinventions.pl/js/script.js'} strategy={ScriptStrategy.idle}
              data-domain={siteUrl.hostname} />
      <Script src={'https://plausible.brightinventions.pl/js/script.tagged-events.js'} strategy={ScriptStrategy.idle}
              data-domain={siteUrl.hostname} />
    </>
  )
}