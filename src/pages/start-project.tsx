// ---
// layout: default
// title: Estimate a project
// description:
// redirect_from: ["/estimate", "/estimate/"]
// ---

import React from 'react'

import {Page} from '../layout/Page'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import { Contact } from '../components/shared/Contact'

const StartProjectPage: React.FC = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Estimate a project"
        description="Estimate your project based on a description and technologies"
      />
      <section className="section">
        <Contact />
      </section>
    </Page>
  )
}

export default StartProjectPage
