import React from 'react'

import { PageDescription, Section, SectionInner } from '../../components/shared'

const Description: React.FC = () => {
  return (
    <Section>
      <SectionInner>
        <PageDescription>
          Our team consists of talented, positive and committed people who work on international projects and enjoy what they do on daily basis.
        </PageDescription>
        <PageDescription>
          If you value team work, responsibility and you would like to create software solutions that really matter in the current world, get to know us better and apply!
        </PageDescription>
      </SectionInner>
    </Section>
  )
}

export default Description
