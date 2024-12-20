import React from 'react'
import { GatsbySSR } from 'gatsby'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPostBodyComponents }, options) => {
  const { enabled } = options
  const microsoftAdsScript = `
  window.initMicrosoftAds = (decision) => {
    ${ enabled && `
      (function(w,d,t,r,u) { var f,n,i; w[u]=w[u]||[],f=function() { var o={ti:"187165652", enableAutoSpaTracking: true}; o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad") }, n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function() { var s=this.readyState; s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null) }, i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i) }) (window,document,"script","//bat.bing.com/bat.js","uetq");
    `}
  }
  window.uet_report_conversion = () => {
    window.uetq = window.uetq || [];
    window.uetq.push('event', 'Click Submit Business Form', {"event_category":"Business Contact Form Button"});
  }
  `
  setPostBodyComponents([<script dangerouslySetInnerHTML={{ __html: microsoftAdsScript }} />])
}
