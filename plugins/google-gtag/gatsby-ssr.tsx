import React from 'react'
import { GatsbySSR } from 'gatsby'
import { consentToGtagValue } from './consent-to-gtag-value'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }, options) => {
  const trackingIds = options.trackingIds ?? []
  if (Array.isArray(trackingIds) && trackingIds.length > 0) {
    const firstTrackingTag = trackingIds[0]
    // https://developers.google.com/tag-platform/gtagjs/install
    const configureGtagScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments) };

gtag('consent', 'default', {
  'ad_storage': '${consentToGtagValue(false)}',
  'analytics_storage': '${consentToGtagValue(false)}',
  'wait_for_update': 100 // we invoke gtag consent update almost immediately after  
});

gtag('js', new Date());

${trackingIds.map(trackingId => {
  return `gtag('config', '${trackingId}');`
}).join('\n')}

`
    setHeadComponents([
      <script async src={'https://www.googletagmanager.com/gtag/js?id=' + firstTrackingTag}></script>,
      <script dangerouslySetInnerHTML={{ __html: configureGtagScript }} />,
    ])
  }
}
