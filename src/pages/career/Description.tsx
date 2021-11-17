import React from 'react'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { PageDescription, Section, SectionInner, CustomSectionInner } from '../../components/shared'
import styled from 'styled-components'
import variables from '../../styles/variables'

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
            <Link to={routeLinks.aboutUs({ page: 'team' })}>Our team</Link> consists of talented, positive and committed
            people who work on international projects and enjoy what they do on daily basis.
          </span>
        </PageDescriptionCareer>
        <PageDescriptionCareer>
          If you value team work, responsibility and you would like to create software solutions that really matter in
          the current world, get to know us better and apply!
        </PageDescriptionCareer>
      </CustomSectionInner>
    </WrapperDesc>
  )
}

export default Description
