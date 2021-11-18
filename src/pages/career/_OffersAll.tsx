import React  from 'react'
import { graphql,  useStaticQuery } from 'gatsby'

import { createJobs } from '../../models/creator'
import OffersList from './_OffersList'

const OffersAll: React.FC = () => <OffersList jobs={createJobs(useStaticQuery(jobsQuery))}/>

const jobsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "job" }, published: { eq: true } }
      }
      skip: 3,
      sort: {fields: [frontmatter___order]}
    ) {
      edges {
        node {
          frontmatter {
            title
            salary
            subtitle
            hours
          }
          fileAbsolutePath
        }
      }
    }
  }
`

export default OffersAll
