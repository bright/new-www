import React, { useEffect } from 'react'
import { PluginOptions } from 'gatsby'
import { Script } from 'gatsby-script'
import { googleTagManagerUrl } from './google-tag-manager-url'
import { consentToGtagValue } from './consent-to-gtag-value'
import { WindowLocation } from '@reach/router'
import { isConnectedToGoogleGtagAssistant, setIsConnectedToGoogleGtagAssistant } from './google-gtag-assistant'

export function gtagInitScript(trackingIds: any[]) {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){
  console.debug('gtag', arguments);  
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
`
}

export const GoogleGtagScript = ({ options, location }: { options: PluginOptions; location?: WindowLocation }) => {
  const trackingIds = options.trackingIds ?? []

  if (Array.isArray(trackingIds) && trackingIds.length > 0) {
    const isConnectedToGtagDebugger = isConnectedToGoogleGtagAssistant(location)
    const partytownEnabled = options.partytownEnabled && !isConnectedToGtagDebugger
    const scriptLoadStrategy = partytownEnabled ? 'off-main-thread' : 'idle'

    useEffect(() => {
      setIsConnectedToGoogleGtagAssistant(isConnectedToGtagDebugger)
    }, [])

    const firstTrackingTag = trackingIds[0]
    // https://developers.google.com/tag-platform/gtagjs/install
    const partytownForwards = partytownEnabled ? ['gtag', 'dataLayer.push'] : []

    return (
      <>
        <Script src={googleTagManagerUrl(firstTrackingTag)} strategy={scriptLoadStrategy} forward={partytownForwards} />
        <Script id='gtag-config' strategy={scriptLoadStrategy}>
          {gtagInitScript(trackingIds)}
        </Script>
      </>
    )
  } else {
    return <></>
  }
}
