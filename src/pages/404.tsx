import React from 'react'

import {Page} from '../layout/Page'
import { Link } from 'gatsby'
import { StatusPanel } from '../components/shared'
import { useLocation } from '@reach/router'
import { useTranslation } from 'react-i18next'
import { SEO } from '../meta/SEO'
// import SEO from "../components/seo"

export const Head = () => <SEO
  title='404: Not found'
/>

const NotFoundPage = () => (
  <Page>
    {/* <SEO title="404: Not found" /> */}

    <StatusPanel title={<>
      <span>404</span> NOT FOUND
    </>}>
      You just hit a route that doesn&#39;t exist... the sadness.
      But don't worry, <Link to="/">click here</Link> to return to our <Link to="/">homepage</Link> and find your way.
    </StatusPanel>
  </Page>
)

export default NotFoundPage
