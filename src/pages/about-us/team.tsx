import React from 'react'
import styled from 'styled-components'

import TeamMembers from '../../components/subcomponents/TeamMembers'
import { FormComponent } from '../../components/about-us/form-section/form'
import { CustomPageTitle, CustomSection, CustomSectionInner, TextRegular } from '../../components/shared'
import { Page } from '../../layout/Page'
import { HelmetTitleDescription } from '../../meta/HelmetTitleDescription'
import variables from '../../styles/variables'

const Caption = styled.div`
  &&& {
    margin: auto auto ${variables.pxToRem(105)};
    font-size: 1.375rem;
    line-height: 40px;
    @media ${variables.device.laptop} {
      margin: auto auto ${variables.pxToRem(64)};
    }
    @media ${variables.device.mobile} {
      margin: auto ${variables.pxToRem(36)} ${variables.pxToRem(64)};
    }
    @media ${variables.device.mobile} {
      margin: auto ${variables.pxToRem(18)} ${variables.pxToRem(44)};
    }
  }
`
export default function TeamPage() {
  return (
    <Page>
      <HelmetTitleDescription
        title='Meet our software development team'
        description='Meet mobile developers, web app developers, project managers, designers, and more people who are a part of our software development team from Poland.'
      />
      <CustomSection
        paddingProps='3rem 2rem 6.5625rem 2rem'
        paddingLaptop='3rem 6rem 4rem '
        paddingTabletXL='3rem 9rem 4rem'
        paddingTablet='3rem 2rem 5.125rem'
        paddingMobileProps='3rem 1.125rem 2.75rem'
      >
        <CustomPageTitle>
          meet our <span>bright</span> team
        </CustomPageTitle>
      </CustomSection>

      <div>
        <Caption>
          <CustomSectionInner>
            <TextRegular>
              We are a team of skilled and talented specialists: mobile, web and backend developers, UI and UX
              designers, product managers and marketers, who understand what makes bright digital products that build
              engagement and loyalty.
            </TextRegular>
          </CustomSectionInner>
        </Caption>
        <TeamMembers isTeam />
        <FormComponent />
      </div>
    </Page>
  )
}
