/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { GlobalStyle } from './src/styles/global'
import {
  registerGlobalMailtoClickHandler,
} from './src/report-mailto-click-to-google-analytics'

export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
)

export const onInitialClientRender = () => {
  registerGlobalMailtoClickHandler();
}
