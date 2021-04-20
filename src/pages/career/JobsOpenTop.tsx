import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import React from 'react'

import variables from '../../styles/variables'
import { getJobPath } from '../../helpers/pathHelpers'
import { routeLinks } from '../../config/routing'
import { createJobs } from '../../models/creator'

const JobsOpenTop: React.FC<{ pathOrigin?: string }> = ({ pathOrigin = '' }) => {
  const jobs = createJobs(useStaticQuery(jobsQuery))

  const JobsContainer = styled.div`
    flex-wrap: wrap;
    justify-content: flex-end;
    
    @media ${variables.device.mobile} {
      && {
        margin-top: 4rem;
      }
    }
  `

  const JobItem = styled.div`
    padding: 0 1em;
    flex-basis: 33%;
    
    @media ${variables.device.mobile} {
      flex-basis: 100%;
    }
  `

  const JobSalary = styled.div`
    word-break: break-all;
    max-width: 280px;
  `

  const JobHours = styled.div`
    &:first-letter {
      text-transform: capitalize;
    }
  `

  const ApplyBtn = styled.a`
    margin-top: 1rem;
  `

  return (
    <JobsContainer className='is-flex is-flex-direction-row open-positions-top'>
      {jobs.map(job => (
        <JobItem className='level-item' key={job.title}>
          <div>
            <a href={`${pathOrigin}/jobs${getJobPath(job.url)}`}>
              <h3 className='has-text-white has-text-weight-bold'>
                {job.title}
              </h3>
              <JobHours className='has-text-grey-light'>
                {job.hours}
              </JobHours>
              <JobSalary className='has-text-primary'>
                {job.salary}
              </JobSalary>
            </a>
            <ApplyBtn href='/apply-for-job' className='button is-primary is-small'>
              Apply
            </ApplyBtn>
          </div>
        </JobItem>
      ))}
      <div className='level-item' style={{ marginRight: '2rem' }}>
        <div>
          <a
            href={`${routeLinks.career}#open-positions`}
            className='has-text-weight-bold has-text-white'
          >
            <figure className='image is-24x24'>
              <img src='/images/arrow-more.svg' alt='See all' />
            </figure>
            See all
          </a>
        </div>
      </div>
    </JobsContainer>
  )
}

export default JobsOpenTop

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