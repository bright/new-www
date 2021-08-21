import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Section, SectionInner, MoreButton, SectionTitle } from '../../components/shared'
import { createJobs } from '../../models/creator'
import OffersList from './OffersList'
import OffersAll from './OffersAll'
import styled from 'styled-components'
import variables from '../../styles/variables'

export const ParagraphHeader = styled(SectionTitle)`
  margin-top: 1rem;
  margin-bottom: 6.56rem;
  font-weight: 900;
  font-size: 2.5rem;

  @media ${variables.device.mobile} {
    margin-top: 1.5rem;
    margin-bottom: 2.75rem;
    font-size: 1.375rem;
  }
`

const Offers: React.FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <Section id='open-positions'>
      <ParagraphHeader>job offers</ParagraphHeader>
      <SectionInner>
        <OffersList jobs={createJobs(useStaticQuery(jobsQuery))} />
        {showAll ? <OffersAll /> : <MoreButton onClick={() => setShowAll(true)}>view all job offers</MoreButton>}
      </SectionInner>
    </Section>
  )
}

const jobsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "job" }, published: { eq: true } } }
      limit: 3
      sort: { fields: [frontmatter___order] }
    ) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            salary
            hours
          }
          fileAbsolutePath
        }
      }
    }
  }
`

export default Offers
