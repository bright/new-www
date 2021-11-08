import React from 'react'
import styled from 'styled-components'
import {
  HideTablet,
  Section,
  SectionTitle,
  CustomContainer,
  CustomSection,
  CustomSectionTitle,
} from '../../components/shared'
import { Carousel } from '../../components/shared/Carousel'
import variables from '../../styles/variables'

const SectionEx = styled(CustomSection)`
  @media ${variables.device.laptop} {
    padding: 0 2.25rem 0;
  }
  @media ${variables.device.tabletXL} {
    padding: 0 3.25rem 0;
  }
  @media ${variables.device.tablet} {
    padding: 0 1.1875rem 0;
  }
`

const SectionTitleEx = styled(CustomSectionTitle)`
  margin-top: 11.625rem;
  margin-bottom: 0;
  font-size: 2.5rem;
  font-weight: 900;
  @media ${variables.device.laptop} {
    margin-top: 7.25rem;
    font-size: 2.125rem;
  }
  @media ${variables.device.mobile} {
    margin-top: 3rem;
    font-size: 1.375rem;
  }
`

const OurWork: React.FC = () => {
  return (
    <SectionEx>
      <CustomContainer>
        <SectionTitleEx>what we have worked on</SectionTitleEx>
        <Carousel wrapperClassName='carousel__career' />
      </CustomContainer>
    </SectionEx>
  )
}

export default OurWork
