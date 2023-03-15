import React from 'react'
import { GatsbySSR } from 'gatsby'
import { GoogleGtagScript, gtagInitScript } from './google-gtag-script'
import { googleTagManagerUrl } from './google-tag-manager-url'

const gtagOrigin = 'https://www.googletagmanager.com'
export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }, options) => {
  const partytownEnabled = options.partytownEnabled as boolean
  if (!partytownEnabled) {
    const trackingIds: string[] = (options.trackingIds as string[]) ?? []
    setHeadComponents([
      <link rel='preconnect' key='preconnect-google-gtag' href={gtagOrigin} />,
      <link rel='dns-prefetch' key='dns-prefetch-google-gtag' href={gtagOrigin} />,

      <script key={`gatsby-plugin-google-gtag`} async src={googleTagManagerUrl(trackingIds[0])} />,
      <script
        key={`gatsby-plugin-google-gtag-config`}
        dangerouslySetInnerHTML={{ __html: gtagInitScript(trackingIds) }}
      />,
    ])
  }
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }, options) => {
  return (
    <>
      {element}
      <GoogleGtagScript options={options} />
    </>
  )
}
