import React from 'react'
import styled from 'styled-components'
import { HideTablet, Section, SectionTitle, CustomContainer, CustomSection } from '../../components/shared'
import { Carousel } from '../../components/shared/Carousel'
import variables from '../../styles/variables'

const SectionEx = styled(Section)`
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 0;
`

const SectionTitleEx = styled(SectionTitle)`
  margin-top: 9.6rem;
  margin-bottom: 0;
  font-size: 2.5rem;
  font-weight: 900;
  @media ${variables.device.mobile} {
    margin-top: 3rem;
    font-size: 1.375rem;
  }
`

const OurWork: React.FC = () => {
  return (
    <CustomSection>
      <CustomContainer>
        <SectionTitleEx>what we have worked on</SectionTitleEx>
        <Carousel wrapperClassName='carousel__career' />
      </CustomContainer>
    </CustomSection>
  )
}

export default OurWork
