import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { getJobPath } from '../../helpers/pathHelpers'
import { routeLinks } from '../../config/routing'

interface Job {
  title: string
  hours: string
  salary: string
  url: string
}

const JobsOpenTop: React.FC<{ pathOrigin?: string }> = ({
  pathOrigin = '',
}) => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          frontmatter: { layout: { eq: "job" }, published: { eq: true } }
        }
        limit: 4
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
  `)
  const jobs = edges.map(v => v.node)

  return (
    <div
      className='is-flex is-flex-direction-row open-positions-top'
      style={{ flexWrap: 'wrap' }}
    >
      {jobs.map(edge => {
        const { frontmatter: job, fileAbsolutePath } = edge
        return (
          <div
            className='level-item'
            style={{ padding: '0 1em' }}
            key={job.title}
          >
            <div>
              <a href={`${pathOrigin}/jobs${getJobPath(fileAbsolutePath)}`}>
                <h3 className='has-text-white has-text-weight-bold'>
                  {job.title}
                </h3>
                <div className='has-text-grey'>{job.hours}</div>
                <div
                  className='has-text-primary'
                  style={{ wordBreak: 'break-all', maxWidth: '280px' }}
                >
                  {job.salary}
                </div>
              </a>
              <a href='/apply-for-job' className='button is-primary'>
                Apply
              </a>
            </div>
          </div>
        )
      })}
      <div className='level-item' style={{ margin: 'auto' }}>
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
    </div>
  )
}

export default JobsOpenTop
