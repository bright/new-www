import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { getJobPath } from '../../helpers/pathHelpers'
import { createJobs } from '../../models/creator'

const JobsOpenAll: React.FC<{ pathOrigin?: string }> = ({ pathOrigin = '' }) => {
  const jobs = createJobs(useStaticQuery(jobsQuery))

  return (
    <div className='open-positions'>
      {jobs.map(job => {
        return (
          <div className='open-position' key={job.title}>
            <a
              href={`${pathOrigin}/jobs${getJobPath(job.url)}`}
              className='has-text-dark'
            >
              <div className='has-text-dark has-text-weight-bold is-size-3'>
                {job.title}
              </div>
              <div className='has-text-grey'>{job.hours}</div>
              <div className='has-text-primary'>{job.salary}</div>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default JobsOpenAll

const jobsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "job" }, published: { eq: true } }
      }
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
