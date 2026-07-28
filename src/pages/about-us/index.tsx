import React from 'react'

import { Page } from '../../layout/Page'

import { CustomSection, CustomPageTitle } from '../../components/shared'
import { HelmetMetaData } from '../../meta/HelmetMetaData'
import { StoryComponent } from '../../components/about-us/story-section/story'
import { FormComponent } from '../../components/about-us/form-section/form'
import Values from './_Values'

const AboutUsPage: React.FC = () => (
  <Page>
    <HelmetMetaData
      title='Our history, team and values'
      description='Since 2012, we have been creating and evolving impactful digital products, from point-of-sale systems and healthcare applications to emergency services apps and digital solutions for logistics and construction.'
    />
    <CustomSection
      paddingProps='3rem 15rem 0rem '
      paddingLaptop='3rem 6rem 0'
      paddingTabletXL='3rem 9rem 0'
      paddingTablet='3rem 2.25rem 0rem'
      paddingMobileProps='3rem 1.125rem 0rem'
    >
      <CustomPageTitle>
        <span>bright</span> history, team and values
      </CustomPageTitle>
    </CustomSection>

    <StoryComponent />
    <Values />
    <FormComponent />
  </Page>
)

export default AboutUsPage
