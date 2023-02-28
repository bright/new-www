import React from 'react'
import { GatsbySSR } from 'gatsby'
import { Script } from 'gatsby-script'
import { consentToGtagValue } from './consent-to-gtag-value'
import { googleTagManagerUrl } from './google-tag-manager-url'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }, options) => {
  const trackingIds = options.trackingIds ?? []
  console.log('google-gtag/onRenderBody', { trackingIds })
  if (Array.isArray(trackingIds) && trackingIds.length > 0) {
    const firstTrackingTag = trackingIds[0]
    // https://developers.google.com/tag-platform/gtagjs/install
    setHeadComponents([
      <link key='googletagmanager-preconnect' rel='preconnect' href='https://www.googletagmanager.com' />,
      <link key='google-analytics-preconnect' rel='preconnect' href='https://www.google-analytics.com' />,
      <script
        key='partytown-vanilla-config'
        dangerouslySetInnerHTML={{
          __html: `partytown = { debug: true }`,
        }}
      />,
      <Script src={googleTagManagerUrl(firstTrackingTag)} strategy='off-main-thread' />,
      <Script id='gtag-config' strategy='off-main-thread' forward={['gtag']}>
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments) };

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
      </Script>,
    ])
  }
}
