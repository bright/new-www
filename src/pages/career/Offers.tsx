import React, { useState } from 'react'
import { graphql,  useStaticQuery } from 'gatsby'

import { Section, SectionInner, MoreButton } from '../../components/shared'
import { createJobs } from '../../models/creator'
import OffersList from './OffersList'
import OffersAll from './OffersAll'

const Offers: React.FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <Section id='open-positions'>
      <SectionInner>
        <OffersList jobs={createJobs(useStaticQuery(jobsQuery))}/>
        {showAll
          ? <OffersAll />
          : <MoreButton onClick={() => setShowAll(true)}>view all job offers</MoreButton>}
      </SectionInner>
    </Section>
  )
}

const jobsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "job" }, published: { eq: true } }
      }
      limit: 3,
      sort: {fields: [frontmatter___order]}
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
