import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { getJobPath } from '../../helpers/pathHelpers'
import { JobModel } from '../../models/gql'
import variables from '../../styles/variables'

const JobWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${variables.pxToRem(63)};
  @media ${variables.device.laptop} {
    gap: ${variables.pxToRem(55)};
  }
  @media ${variables.device.tabletXL} {
    gap: ${variables.pxToRem(43)};
  }
  @media ${variables.device.tablet} {
    gap: ${variables.pxToRem(32)};
    flex-direction: column;
  }
`

const Job = styled.h3`
  flex-basis: calc(50% - ${variables.pxToRem(63)} / 2);
  background: #ffffff 0% 0%;
  border: 1px solid #d3d3d3;
  opacity: 1;
  padding: ${variables.pxToRem(36)} ${variables.pxToRem(32)} ${variables.pxToRem(76)} ${variables.pxToRem(36)};
  &:hover {
    box-shadow: 0px 0px 70px #0000001d;
  }
  @media ${variables.device.laptop} {
    flex-basis: calc(50% - ${variables.pxToRem(55)} / 2);
    padding: ${variables.pxToRem(32)} ${variables.pxToRem(32)} ${variables.pxToRem(65)} ${variables.pxToRem(32)};
  }
  @media ${variables.device.tabletXL} {
    flex-basis: calc(50% - ${variables.pxToRem(43)} / 2);
    padding: ${variables.pxToRem(25)} ${variables.pxToRem(25)} ${variables.pxToRem(52)} ${variables.pxToRem(25)};
  }

  @media ${variables.device.tablet} {
    flex-basis: 100%;
    padding: ${variables.pxToRem(32)};
  }

  @media ${variables.device.mobile} {
    padding: ${variables.pxToRem(18)};
  }
`
const JobSubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${variables.pxToRem(20)};
  @media ${variables.device.laptop} {
    margin-bottom: ${variables.pxToRem(16)};
  }
  @media ${variables.device.tabletXL} {
    margin-bottom: ${variables.pxToRem(13)};
  }
  @media ${variables.device.tablet} {
    margin-bottom: ${variables.pxToRem(16)};
  }
  @media ${variables.device.tablet} {
    margin-bottom: ${variables.pxToRem(13)};
  }
`
const JobHourWrapper = styled.div`
  position: relative;
  font-size: ${variables.pxToRem(20)};
  line-height: ${variables.pxToRem(40)};
  font-family: ${variables.font.customtext.lato};

  & .job {
    margin-right: 2rem;
    font-weight: 600;
    text-transform: lowercase;

    & :after {
      position: absolute;
      top: 50%;
      left: 35%;
      transform: translateY(-50%);
      font-size: ${variables.pxToRem(20)};
      content: '•';
    }
  }
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(16)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(14)};
    line-height: ${variables.pxToRem(19)};
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
        font-weight: 400;
      }
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(17)};
      }
      @media ${variables.device.tabletXL} {
        font-size: ${variables.pxToRem(14)};
      }
      @media ${variables.device.tabletXL} {
        font-size: ${variables.pxToRem(17)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(14)};
      }
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
  display: flex;
  flex-direction: column;
`
const JobTitle = styled(Title)`
  font-size: 1.75rem;
  line-height: 2.5rem;
  font-weight: 900;
  display: inline-block;
  margin-bottom: 1.1875rem;

  @media ${variables.device.laptop} {
    font-size: 1.5625rem;
    line-height: 2.5rem;
    margin-bottom: ${variables.pxToRem(16)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(19)};
    line-height: ${variables.pxToRem(26)};
  }
  @media ${variables.device.tablet} {
    margin-bottom: ${variables.pxToRem(17)};
    font-size: ${variables.pxToRem(25)};
    line-height: ${variables.pxToRem(34)};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(19)};
    line-height: ${variables.pxToRem(26)};
  }
`

const JobSubtitle = styled(Subtitle)`
  font-size: 1.25rem;
  font-weight: 600;
  display: inline-block;
  font-family: ${variables.font.customtext.lato};
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(17)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(13)};
  }
  @media ${variables.device.tablet} {
    font-size: ${variables.pxToRem(17)};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(13)};
  }
`
const JobInfo = styled.div`
  font-size: 1.375rem;
  font-family: ${variables.font.customtext.lato};

  @media ${variables.device.tablet} {
    font-size: 1.25rem;
  }
  @media ${variables.device.mobile} {
    font-size: 1rem;
  }
`
const JobSentence = styled.div`
  text-align: center;
  font: normal normal 800 ${variables.pxToRem(28)} / ${variables.pxToRem(34)} Montserrat;
  letter-spacing: 0px;
  color: #0a0a0a;
  padding-top: ${variables.pxToRem(81)};
  & a {
    color: #0a0a0a;
    text-decoration: underline;
  }
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(25)};
    line-height: ${variables.pxToRem(30)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(19)};
    line-height: ${variables.pxToRem(23)};
    padding-top: ${variables.pxToRem(64)};
  }
  @media ${variables.device.tablet} {
    font-size: ${variables.pxToRem(25)};
    line-height: ${variables.pxToRem(30)};
    max-width: 63%;
    margin: 0 auto;
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(19)};
    line-height: ${variables.pxToRem(23)};
    max-width: 100%;
    margin: 0 auto;
  }
`

const OffersList: React.FC<{ jobs?: JobModel[] }> = ({ jobs }) => {
  return (
    <>
      <JobWrapper>
        {(jobs || []).map(job => (
          <Job>
            <JobLink to={routeLinks.jobs + getJobPath(job.url)}>
              <JobSubtitleWrapper>
                <JobHourWrapper>
                  <span className='job'>{job.hours}</span>Gdańsk/remote
                </JobHourWrapper>
                <JobSubtitle>{job.subtitle}</JobSubtitle>
              </JobSubtitleWrapper>

              <JobTitle className='job__title'>{job.title}</JobTitle>

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
              </Info>
            </JobLink>
          </Job>
        ))}
      </JobWrapper>
      <JobSentence>
        <p>
          Haven’t found the job offer for you? <Link to={'#contact'}>Contact us</Link> anyway.
        </p>
      </JobSentence>
    </>
  )
}

export default OffersList
