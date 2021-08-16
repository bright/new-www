import React from 'react'
import styled from 'styled-components'
import { HideTablet, Section, SectionTitle, CustomContainer } from '../../components/shared'
import { Carousel } from '../../components/shared/Carousel'

const SectionEx = styled(Section)`
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 0;
`

const SectionTitleEx = styled(SectionTitle)`
  margin-top: 9.6rem;
  margin-bottom: 0;
  font-size: 2.5rem;
  font-weight: 800;
`

const OurWork: React.FC = () => {
  return (
    <HideTablet>
      <CustomContainer>
        <SectionEx>
          <SectionTitleEx>what we have worked on</SectionTitleEx>
          <Carousel wrapperClassName='carousel__career' />
        </SectionEx>
      </CustomContainer>
    </HideTablet>
  )
}

export default OurWork
