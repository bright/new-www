import React from 'react'
import { GatsbySSR } from 'gatsby'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPostBodyComponents }, options) => {
  const { enabled } = options
  const lfInitScript = `
  window.setupTrackingConsentInLeadForensics = (decision) => {
    ${ enabled && `
      const lfScript = document.createElement("script");
    
      lfScript.type = "text/javascript";
      lfScript.src = "https://www.perception-sharp52.com/js/800602.js";

      document.head.appendChild(lfScript);
    `}
  }
  `
  setPostBodyComponents([<script dangerouslySetInnerHTML={{ __html: lfInitScript }} />])
}
