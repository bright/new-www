import React from 'react'
import { PageDescription, Section, SectionInner, CustomSectionInner } from '../components/shared'
import styled from 'styled-components'
import variables from '../styles/variables'

const WrapperDesc = styled.section`
  .career-desc {
    padding: 0 2.25rem;
    @media ${variables.device.mobile} {
      padding: 2rem 1.125rem 1rem;
    }
  }
`

export const PageDescriptionCareer = styled(PageDescription)`
  padding-left: 0;
  padding-right: 0;
  font-size: 1.375rem;

  @media ${variables.device.tablet} {
    font-size: 1.25rem;
  }

  @media ${variables.device.mobile} {
    font-size: 1rem;
    &:last-of-type {
      margin-bottom: 0rem;
    }
  }
`

const Description: React.FC = () => {
  return (
    <WrapperDesc>
      <CustomSectionInner className='career-desc'>
        <PageDescriptionCareer>
          <span>
            We are a team of talented, enthusiastic, and dedicated professionals building international digital products that make a difference.
          </span>
        </PageDescriptionCareer>
        <PageDescriptionCareer>
          If you enjoy teamwork, taking responsibility, and want to create solutions that truly matter in today’s world, come join us.
        </PageDescriptionCareer>
      </CustomSectionInner>
    </WrapperDesc>
  )
}

export default Description
