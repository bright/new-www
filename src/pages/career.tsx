// ---
// layout: default
// title: Career
// class: career
// ---

import React from 'react'

import { Page } from '../layout/Page'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import { PageTitle, Section } from '../components/shared'
import WhatWePractice from './career/_WhatWePractice'
import HeaderImages from './career/_HeaderImages'
import Description from './career/_Description'
import Offers from './career/_Offers'
import RecruitingProcess from './career/_RecruitingProcess'
import OurWork from './career/_OurWork'
import Benefits from './career/_Benefits'
import Traits from './career/_Traits'
import Form from './career/_Form'
import { CustomContainer } from '../components/shared/index.styled'
import styled from 'styled-components'
import variables from '../styles/variables'
import { TechnologyTags } from '../components/shared/TechnologyTags'
import { useWindowSize } from '../components/utils/use-windowsize'

export const SectionCareerTitle = styled(Section)`
  padding: 3rem 2rem 3rem 2rem;
  @media ${variables.device.laptop} {
    padding: 3rem 2rem 4rem 2rem;
  }
  @media ${variables.device.mobile} {
    padding: 3rem 1.125rem 0rem 1.125rem;
  }
`
const PageTitleCareer = styled(PageTitle)`
  @media ${variables.device.laptop} {
    font-size: 2.75rem;
  }
  @media ${variables.device.tabletXL} {
    font-size: 2.375rem;
  }

  @media ${variables.device.mobile} {
    font-size: 2rem;
    line-height: 2.75rem;
    font-weight: 900;
  }
`

const CareerPage: React.FC = () => {
  return (
    <Page className='page-career'>
      <HelmetTitleDescription
        title='Career'
        description='We like people with bright minds! Join software development company from Gdańsk.'
      />

      <div className='container'>
        <SectionCareerTitle className='career-title'>
          <PageTitleCareer>
            we like people with <span>bright</span> minds
          </PageTitleCareer>
        </SectionCareerTitle>
      </div>

      <HeaderImages />

      <Description />
      <Offers />
      <RecruitingProcess />

      <WhatWePractice />
      <OurWork />

      <Traits />
      <Benefits />

      <Form />
    </Page>
  )
}

export default CareerPage
