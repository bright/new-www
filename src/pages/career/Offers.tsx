import React, { useState } from 'react'
import { graphql,  useStaticQuery } from 'gatsby'

import { Section, MoreButton } from '../../components/shared'
import { createJobs } from '../../models/creator'
import OffersList from './OffersList'
import OffersAll from './OffersAll'

const Offers: React.FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className='container'>
      <Section id='open-positions'>
        <OffersList jobs={createJobs(useStaticQuery(jobsQuery))}/>
        {showAll
          ? <OffersAll />
          : <MoreButton onClick={() => setShowAll(true)}>view all job offers</MoreButton>}
      </Section>
    </div>
  )
}

const jobsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "job" }, published: { eq: true } }
      }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
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
