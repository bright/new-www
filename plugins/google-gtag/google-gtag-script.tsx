import React from 'react'
import { PluginOptions } from 'gatsby'
import { Script } from 'gatsby-script'
import { googleTagManagerUrl } from './google-tag-manager-url'
import { consentToGtagValue } from './consent-to-gtag-value'

export const GoogleGtagScript = ({ children, options }: { children: React.ReactNode; options: PluginOptions }) => {
  const trackingIds = options.trackingIds ?? []
  if (Array.isArray(trackingIds) && trackingIds.length > 0) {
    const firstTrackingTag = trackingIds[0]
    // https://developers.google.com/tag-platform/gtagjs/install
    return (
      <>
        {children}
        <Script
          key='partytown-vanilla-config'
          dangerouslySetInnerHTML={{
            __html: `partytown = { debug: true }`,
          }}
        />
        <Script src={googleTagManagerUrl(firstTrackingTag)} strategy='off-main-thread' forward={['gtag', 'dataLayer.push']} />
        <Script id='gtag-config' strategy='off-main-thread'>
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

postMessage('gtag-configured');
`}


        </Script>
      </>
    )
  } else {
    return <>{children}</>
  }
}
