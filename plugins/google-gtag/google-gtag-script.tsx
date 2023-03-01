import React from 'react'
import { PluginOptions } from 'gatsby'
import { Script } from 'gatsby-script'
import { googleTagManagerUrl } from './google-tag-manager-url'
import { consentToGtagValue } from './consent-to-gtag-value'
import { WindowLocation } from '@reach/router'

export const GoogleGtagScript = ({ options, location }: { options: PluginOptions; location?: WindowLocation }) => {
  const trackingIds = options.trackingIds ?? []

  const isConnectedToGtagDebugger = location?.search?.includes('gtm_debug')

  const scriptLoadStrategy = isConnectedToGtagDebugger ? 'post-hydrate' : 'off-main-thread'

  if (Array.isArray(trackingIds) && trackingIds.length > 0) {
    const firstTrackingTag = trackingIds[0]
    // https://developers.google.com/tag-platform/gtagjs/install
    return (
      <>
        <Script
          src={googleTagManagerUrl(firstTrackingTag)}
          strategy={scriptLoadStrategy}
          forward={['gtag', 'dataLayer.push']}
        />
        <Script id='gtag-config' strategy={scriptLoadStrategy}>
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){
  // console.log('gtag', arguments);  
  dataLayer.push(arguments) 
};
window.gtag = gtag;
gtag('consent', 'default', {
  'ad_storage': '${consentToGtagValue(false)}',
  'analytics_storage': '${consentToGtagValue(false)}',
  'wait_for_update': 100 // we invoke gtag consent update almost immediately after  
});

gtag('js', new Date());

${trackingIds
  .map(trackingId => {
    return `gtag('config', '${trackingId}');`
  })
  .join('\n')}
`}
        </Script>
      </>
    )
  } else {
    return <></>
  }
}
