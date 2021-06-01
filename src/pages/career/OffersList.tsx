import React, {useMemo}  from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { routeLinks } from '../../config/routing'
import { getJobPath } from '../../helpers/pathHelpers'
import { JobModel } from '../../models/gql'
import variables from '../../styles/variables'

import arrowImg from '../../../static/images/career/arrow.svg'

const Job = styled.div`
  &:not(:last-child) {
    margin-bottom: 4rem;
  }

  @media ${variables.device.mobile} {
    margin: 0 0.5rem;
  }
`

const Title = styled.a`
  display: block;
  color: ${variables.color.black};
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
`

const Info = styled.div`
  & > div {
    position: relative;

    &:last-child span {
      position: relative;
      display: inline-block;
      margin-right: 2rem;
      text-transform: lowercase;
      font-weight: 500;
    }
    
    &:last-child span:after,
    &:first-child div:first-child:after {
      position: absolute;
      top: 50%;
      right: -1.3rem;
      transform: translateY(-55%);
      font-size: 2rem;
      content: '•';
    }
    
    &:first-child div {
      display: inline-block;
      
      &:first-child {
        position: relative;
        margin-right: 2rem;

        &:after {
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

const OffersList: React.FC<{jobs?: JobModel[]}> = ({jobs}) => {
  return (
    <>
      {(jobs || []).map(job => (
        <Job>
          <Title href={routeLinks.jobs + getJobPath(job.url)}>{job.title}</Title>
          <Info>
            <div>{job.salary.split(' or ').map(salary => <div>{salary}</div>)}</div>
            <div><span>{job.hours}</span>Gdańsk</div>
          </Info>
          <Link to={routeLinks.jobs + getJobPath(job.url)}>
            <Arrow src={arrowImg} alt='show job details' />
          </Link>
        </Job>
      ))}
    </>
  )
}

export default OffersList
