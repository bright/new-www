// ---
// layout: default
// title: Estimate a project
// description:
// redirect_from: ["/estimate", "/estimate/"]
// ---

import React from 'react'

import { Page } from '../layout/Page'
import { Contact } from '../components/shared/Contact'
import { HelmetMetaData } from '../meta/HelmetMetaData'

const StartProjectPage: React.FC = () => {
  return (
    <Page>
      <HelmetMetaData
        title='Estimate a project'
        description='Estimate your project based on a description and technologies'
      />
      <section>
        <Contact
          isStartProject={true}
          formButton='Business Contact Form Button'
          actionFormButton='Click Submit Business Form'
        />
      </section>
    </Page>
  )
}

export default StartProjectPage
