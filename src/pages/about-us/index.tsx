import React from 'react'

import { Page } from '../../layout/Page'

import { CustomSection, CustomPageTitle } from '../../components/shared'
import { HelmetTitleDescription } from '../../meta/HelmetTitleDescription'
import { StoryComponent } from '../../components/about-us/story-section/story'
import TeamMembers from '../../components/subcomponents/TeamMembers'
import { FormComponent } from '../../components/about-us/form-section/form'
import Values from './_Values'

const AboutUsPage: React.FC = () => (
  <Page>
    <HelmetTitleDescription
      title='Our history, team and values'
      description='Since 2012 we have built software for startups, digital agencies and mid-sized organisations from such industries as FinTech, Healthcare or Retail.'
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
    <TeamMembers isWhyUs={true} />
    <Values />
    <FormComponent />
  </Page>
)

export default AboutUsPage
