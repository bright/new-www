// ---
// layout: default
// title: Career
// class: career
// ---

import React from 'react'

import { Page } from '../layout/Page'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import { PageTitle, Section } from '../components/shared'
import WhatWePractice from './career/WhatWePractice'
import Images from './career/Images'
import Description from './career/Description'
import Offers from './career/Offers'
import RecruitingProcess from './career/RecruitingProcess'
import OurWork from './career/OurWork'
import Benefits from './career/Benefits'
import Traits from './career/Traits'
import Form from './career/Form'

const CareerPage: React.FC = () => {
  return (
    <Page className="page-career">
      <HelmetTitleDescription
        title="Career"
        description='we are looking for passionate, positive and bright people'
      />

      <div className='container'>
        <Section>
          <PageTitle>
            we are looking for passionate,<br/>
            positive and <span>bright</span> people
          </PageTitle>
        </Section>
      </div>

      <Images />

      <div className='container'>
        <Description />
        <Offers />
        <RecruitingProcess />
      </div>

      <WhatWePractice />
      <OurWork />

      <Traits />
      <Benefits />

      <Form />
    </Page>
  )
}

export default CareerPage
