import React  from 'react'
import styled from 'styled-components'

import { routeLinks } from '../../config/routing'
import { getJobPath } from '../../helpers/pathHelpers'
import { JobModel } from '../../models/gql'
import variables from '../../styles/variables'

const Job = styled.div`
  &:not(:last-child) {
    margin-bottom: 4rem;
  }

  @media ${variables.device.mobile} {
    margin: 0 2rem;
  }
`

const Title = styled.a`
  display: block;
  color: ${variables.color.black};
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1.4rem;
`

const Info = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  & > div {
    position: relative;

    &:first-child:after,
    &:nth-child(2):after {
      position: absolute;
      top: 50%;
      right: -1.3rem;
      transform: translateY(-55%);
      content: '|';
    }
    &:first-child:after {
      font-size: 2rem;
      content: '•';
    }
    
    & > div:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`

const OffersList: React.FC<{jobs: JobModel[]}> = ({jobs}) => {
  return (
    <>
      {jobs.map(job => (
        <Job>
          <Title href={routeLinks.jobs + getJobPath(job.url)}>{job.title}</Title>
          <Info>
            <div>{job.salary.split(' or ').map(salary => <div>{salary}</div>)}</div>
            <div>{job.hours}</div>
            <div>Gdańsk</div>
          </Info>
        </Job>
      ))}
    </>
  )
}

export default OffersList
