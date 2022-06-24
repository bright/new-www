import React from 'react'
import styled from 'styled-components'
import { CustomSection, CustomSectionTitle } from '../../components/shared'
import { CarouselQuotesSwiper } from '../../components/shared/CarouselQuotesSwiper'
import variables from '../../styles/variables'

const SectionEx = styled(CustomSection)`
  @media ${variables.device.laptop} {
    padding: 0 6rem 0;
  }
  @media ${variables.device.tabletXL} {
    padding: 0 5.875rem 0;
  }
  @media ${variables.device.tablet} {
    padding: 0 1.1875rem 0;
  }
`

const OurWork: React.FC = () => {
  return (
    <SectionEx>
      <CustomSectionTitle tabletMargin='116px 0 50px' margin='154px 0 50px'>
        our team about working at <span>bright</span>
      </CustomSectionTitle>
      <CarouselQuotesSwiper />
    </SectionEx>
  )
}

export default OurWork
