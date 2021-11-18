import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { SectionInner, MoreButton, SectionTitle, CustomSection, CustomSectionInner } from '../../components/shared'
import { createJobs } from '../../models/creator'
import OffersList from './_OffersList'
import OffersAll from './_OffersAll'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { CustomSectionTitle } from '../../components/shared/index.styled'

export const ParagraphHeader = styled(CustomSectionTitle)`
  margin-top: 11rem;
  margin-bottom: 4.125rem;
  font-weight: 900;
  font-size: 2.5rem;
  @media ${variables.device.laptop} {
    margin-top: 1.5rem;
    margin-bottom: 4rem;
    font-size: 2.125rem;
  }

  @media ${variables.device.mobile} {
    margin-top: 1.5rem;
    margin-bottom: 2.75rem;
    font-size: 1.375rem;
  }
`

const Offers: React.FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <CustomSection id='open-positions'>
      <ParagraphHeader>job offers</ParagraphHeader>
      <CustomSectionInner>
        <OffersList jobs={createJobs(useStaticQuery(jobsQuery))} />
        {showAll ? <OffersAll /> : <MoreButton onClick={() => setShowAll(true)}>view all job offers</MoreButton>}
      </CustomSectionInner>
    </CustomSection>
  )
}

const jobsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "job" }, published: { eq: true } } }
      limit: 4
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
