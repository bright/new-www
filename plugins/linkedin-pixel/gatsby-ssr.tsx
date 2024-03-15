import React from 'react'
import { GatsbySSR } from 'gatsby'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPostBodyComponents }, options) => {
  const { pixelId } = options
  if (pixelId) {
    const linkedInInitScript = `
        _linkedin_partner_id = '${pixelId}'
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
        window._linkedin_data_partner_ids.push(_linkedin_partner_id)
      
        window.initLinkedIn = () => {
          (function(l) {
            if (!l) {
              window.lintrk = function(a, b) {
                window.lintrk.q.push([a, b])
              }
              window.lintrk.q = []
            }
            var s = document.getElementsByTagName('script')[0]
            var b = document.createElement('script')
            b.type = 'text/javascript'
            b.async = true
            b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
            s.parentNode.insertBefore(b, s)
          })(window.lintrk)
        }
    `
    setPostBodyComponents([<script dangerouslySetInnerHTML={{ __html: linkedInInitScript }} />])
  }
}
