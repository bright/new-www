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

export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)

export const onInitialClientRender = () => {
  registerGlobalMailtoClickHandler()
}

// export const replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     loadableReady(() => {
//       ReactDOM.render(element, container, callback)
//     })
//   }
// }
