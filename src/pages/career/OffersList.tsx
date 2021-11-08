import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { getJobPath } from '../../helpers/pathHelpers'
import { JobModel } from '../../models/gql'
import variables from '../../styles/variables'

const Job = styled.h3`
  margin: 0 2.65625rem 4rem;

  &:nth-last-of-type(2) {
    margin-bottom: 3.125rem;
  }

  @media ${variables.device.tablet} {
    margin: 0 0 4rem;
  }

  @media ${variables.device.mobile} {
    margin: 0;
    margin-bottom: 2.75rem;
    &:nth-last-of-type(2) {
      margin-bottom: 1rem;
    }
  }
`

const Title = styled.span`
  display: block;
  margin-bottom: 0.6rem;
  & > a {
    font-weight: 700;
    font-size: 1.5rem;
    color: ${variables.color.black};
  }
`

const Subtitle = styled.span`
  color: ${variables.color.primary};
  font-family: ${variables.font.customtext.lato};
`

const Info = styled.div`
  color: ${variables.color.black2};
  font-family: ${variables.font.customtext.lato};

  & > div {
    position: relative;

    &:last-child {
      font-size: 1.25rem;

      & span {
        position: relative;
        display: inline-block;
        margin-right: 2rem;
        text-transform: lowercase;
        font-weight: 700;
      }
      @media ${variables.device.mobile} {
        font-size: 1rem;
      }
    }

    &:last-child span:after {
      position: absolute;
      top: 50%;
      right: -1.5rem;
      transform: translateY(-55%);
      font-size: 1.25rem;
      content: '•';
    }

    &:first-child div {
      display: inline-block;

      &:first-child {
        position: relative;
        margin-right: 1rem;

        &:after {
          position: absolute;
          top: 50%;
          right: -0.6rem;
          transform: translateY(-55%);
          font-size: inherit;
          content: '|';
        }
      }
    }

    @media ${variables.device.mobile} {
      &:first-child div {
        display: block;

        &:first-child:after {
          content: none;
        }
      }
    }
  }
`

const Arrow = styled.img`
  margin: 1rem 0;
  width: 1.2rem;
  cursor: pointer;
`

const JobLink = styled(Link)`
  color: black;

  &:hover .job__title {
    color: var(--orange-200);
  }
`
const JobTitle = styled(Title)`
  font-size: 1.75rem;
  line-height: 2.5rem;
  font-weight: 900;
  display: inline-block;
  margin-right: 0.875rem;
  margin-bottom: 1.1875rem;
  @media ${variables.device.laptop} {
    font-size: 1.5625rem;
    line-height: 2.5rem;
    margin-right: 0.8125rem;
  }
  @media ${variables.device.tablet} {
    margin-bottom: 0.8125rem;
  }

  @media ${variables.device.mobile} {
    font-size: 1.125rem;
    margin-right: 0.625rem;
  }
`

const JobSubtitle = styled(Subtitle)`
  font-size: 1.25rem;
  font-weight: 600;
  display: inline-block;
  font-family: ${variables.font.customtext.lato};
  @media ${variables.device.laptop} {
    font-size: 1.125rem;
  }

  @media ${variables.device.mobile} {
    font-size: 1rem;
  }
`
const JobInfo = styled.div`
  font-size: 1.375rem;
  font-family: ${variables.font.customtext.lato};
  margin-bottom: 0.75rem;

  @media ${variables.device.tablet} {
    font-size: 1.25rem;
  }
  @media ${variables.device.mobile} {
    font-size: 1rem;
  }
`

const OffersList: React.FC<{ jobs?: JobModel[] }> = ({ jobs }) => {
  return (
    <>
      {(jobs || []).map(job => (
        <Job>
          <JobLink to={routeLinks.jobs + getJobPath(job.url)}>
            <JobTitle className='job__title'>{job.title}</JobTitle>
            <JobSubtitle>{job.subtitle}</JobSubtitle>
            <Info>
              <JobInfo>
                {job.salary.split(' or ').map(salary => {
                  const salaryType = salary.match(/(UoP)|(B2B)/)
                  if (salaryType !== null) {
                    const salaryValue = salaryType.index && salary.slice(0, salaryType.index - 1)
                    return (
                      <div>
                        {salaryValue} (<span>{salaryType[0]}</span>)
                      </div>
                    )
                  } else {
                    return <div>{salary}</div>
                  }
                })}
              </JobInfo>
              <div>
                <span>{job.hours}</span>Gdańsk/remote
              </div>
            </Info>
          </JobLink>
        </Job>
      ))}
    </>
  )
}

export default OffersList
