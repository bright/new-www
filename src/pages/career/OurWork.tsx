import React  from 'react'
import styled from 'styled-components'

import { HideTablet, Section, SectionTitle } from '../../components/shared'
import { Carousel } from '../../components/shared/Carousel'

const SectionTitleEx = styled(SectionTitle)`
  margin-top: 3rem;
  margin-bottom: 0;
`

const OurWork: React.FC = () => {
  return (
    <div className='container'>
      <Section>
        <SectionTitleEx>what we have worked on</SectionTitleEx>
        <HideTablet>
          <Carousel />
        </HideTablet>
      </Section>
    </div>
  )
}

export default OurWork
