/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { GlobalStyle } from './src/styles/global'
import { registerGlobalMailtoClickHandler } from './src/report-mailto-click-to-google-analytics'
const React = require('react')
const loadableReady = require('@loadable/component').loadableReady
const addScript = url => {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  document.body.appendChild(script)
}
export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)

export const onInitialClientRender = () => {
  registerGlobalMailtoClickHandler()
  window.onload = () => {
    addScript('https://app.getresponse.com/view_webform_v2.js?u=QX16N&webforms_id=hiz1B')
  }
}

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      ReactDOM.render(element, container, callback)
    })
  }
}
