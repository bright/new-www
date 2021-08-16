import React from 'react'
import { Link } from 'gatsby'

import { routeLinks } from "../../config/routing"
import { PageDescription, Section, SectionInner } from '../../components/shared'

const Description: React.FC = () => {
  return (
    <Section>
      <SectionInner>
        <PageDescription>
          <span>
            <Link to={routeLinks.aboutUs({page: 'team'})}>Our team</Link> consists of talented, positive and
            committed people who work on international projects and enjoy what they do on daily basis.
          </span>
        </PageDescription>
        <PageDescription>
          If you value team work, responsibility and you would like to create software solutions that really matter in
          the current world, get to know us better and apply!
        </PageDescription>
      </SectionInner>
    </Section>
  )
}

export default Description
