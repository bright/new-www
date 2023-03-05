import React from 'react'
import { PluginOptions } from 'gatsby'
import { Script } from 'gatsby-script'
import { partytownEnabled } from '../../src/partytown'

export const FacebookFqbScript = ({ options }: { options: PluginOptions }) => {
  const pixelId = options.pixelId
  if (pixelId) {
    const scriptLoadStrategy = partytownEnabled ? 'off-main-thread' : 'post-hydrate'
    const partytownForwards = partytownEnabled ? ['fbq'] : undefined
    return (
      <>
        <Script
          src={'https://connect.facebook.net/en_US/fbevents.js'}
          strategy={scriptLoadStrategy}
          forward={partytownForwards}
        />
        <Script id='facebook-pixel-config'>{`
let fbq = window.fbq = function() {
  fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
}
if (!window._fbq) window._fbq = fbq
fbq.push = fbq
fbq.loaded = !0
fbq.version = '2.0'
fbq.queue = []

fbq('consent', 'revoke');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
        `}</Script>
      </>
    )
  } else {
    return null
  }
}
