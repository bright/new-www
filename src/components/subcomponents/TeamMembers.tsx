import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import { routeLinks } from '../../config/routing'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { useAuthors } from '../../use-authors/use-authors'
import variables from '../../styles/variables'
import ScrollArrow from './ArrowScrollToTop'
import { useWindowSize } from '../utils/use-windowsize'
import { string } from 'prop-types'
import { MoreButton } from '../shared'

const TeamMember = styled.article<{ isOurServiceTemplate: boolean }>`
  border: 1px solid rgba(0, 0, 0, 0.125);
  color: ${variables.color.text};
  flex-basis: calc(25% - 3.5625rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 3.5625rem 3.5625rem 0 0;
  &:hover {
    & .avatar1 {
      opacity: 0;
    }

    & .avatar2 {
      opacity: 1;
    }
  }
  &:nth-of-type(4n) {
    margin-right: 0;
  }
  &:nth-of-type(n + 1) {
    margin-top: 0;
  }
  &:nth-of-type(n + 5) {
    margin-top: 3.5625rem;
  }
  @media ${variables.device.laptop} {
    margin: 3.0625rem 3.0625rem 0 0;
  }
  @media ${variables.device.tablet} {
    margin: 0;
    margin-bottom: 2rem;
  }
  @media ${variables.device.mobile} {
    flex-basis: ${({ isOurServiceTemplate }) => (isOurServiceTemplate ? '100%' : 'calc(50% - 1rem)')};
    margin: ${({ isOurServiceTemplate }) => (isOurServiceTemplate ? '2rem 0 0 0' : '2rem 2rem 0 0')};

    &:nth-of-type(2n) {
      margin-right: 0;
    }
    ${({ isOurServiceTemplate }) =>
      isOurServiceTemplate
        ? `&:nth-of-type(n + 1) {
      margin-top: 2rem;
    }`
        : `&:nth-of-type(n + 1) {
      margin-top: 0;
    }`};
    &:nth-of-type(n + 3) {
      margin-top: 2rem;
    }
  }

  && a {
    display: grid;
    color: ${variables.color.text};
    p {
      margin: 0;
    }

    div {
      display: grid;
      gap: 10px;
      padding-bottom: 42px;
      p strong {
        font-family: ${variables.font.customtitle.monserat};
        font-weight: 900;
        font-size: 2rem;
        line-height: 39px;
      }
      p:nth-child(2) {
        font-family: ${variables.font.customtitle.monserat};
        font-size: 1.25rem;
        line-height: 24px;
      }
      p:last-child {
        font-size: 1.125rem;
        line-height: 22px;
        color: ${variables.color.text};
        opacity: 0.75;
      }
      @media ${variables.device.laptop} {
        p strong {
          font-size: 1.5625rem;
          line-height: 1.875rem;
        }
        p:nth-child(2) {
          font-size: 1rem;
          line-height: 1.1875rem;
        }
        p:last-child {
          font-size: 1.125rem;
          line-height: 22px;
        }
      }
      @media ${variables.device.mobile} {
        padding: 0 1.5625rem 2rem;

        p strong {
          font-size: ${({ isOurServiceTemplate }) => (isOurServiceTemplate ? `${variables.pxToRem(22)}` : '1rem')};
          line-height: ${({ isOurServiceTemplate }) =>
            isOurServiceTemplate ? `${variables.pxToRem(27)}` : '1.125rem'};
        }
        p:nth-child(2) {
          font-size: ${({ isOurServiceTemplate }) => (isOurServiceTemplate ? `${variables.pxToRem(18)}` : '0.75rem')};
          line-height: ${({ isOurServiceTemplate }) =>
            isOurServiceTemplate ? `${variables.pxToRem(22)}` : '0.9375rem'};
        }
        p:last-child {
          font-size: 1.125rem;
          line-height: 22rem;
        }
      }
    }
  }
  && figure {
    margin: 0;
    .image {
      width: 172px;
      height: 306px;
      max-height: 306px;
      margin: 0 auto;
      @media ${variables.device.laptop} {
        width: 150px;
        height: 265px;
        max-height: 265px;
      }
      @media ${variables.device.tablet} {
        width: 205px;
        height: 364px;
        max-height: 364px;
      }

      ${({ isOurServiceTemplate }) =>
        isOurServiceTemplate
          ? `@media ${variables.device.mobile} {
        width: 205px;
        height: 364px;
        max-height: 364px;
      }`
          : `@media ${variables.device.mobile} {
        width: 94px;
        height: 168px;
        max-height: 168px;
      }`};
    }
  }
`
const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  justify-content: center;
  margin: auto;
  flex-wrap: wrap;
  flex: 1;
  margin-bottom: 122px;
  @media ${variables.device.laptop} {
    max-width: 1248px;
  }
  @media ${variables.device.tablet} {
    display: block;
    margin-bottom: 2.1875rem;
    margin: 0 auto;
  }
  @media ${variables.device.mobile} {
    display: flex;
  }
`
const TeamMembersSection = styled.div<{ isOurServiceTemplate: boolean }>`
  @media ${variables.device.mobile} {
    padding: ${({ isOurServiceTemplate }) => (isOurServiceTemplate ? `0 ${variables.pxToRem(18)}` : '0 0.5rem')};
  }
`

const AvatarWrapper = styled.figure<{ isOurServiceTemplate: boolean }>`
  position: relative;
  transition: all 0.3s;
  margin-bottom: 1.125rem !important;
  @media ${variables.device.tablet} {
    margin-bottom: 2.1875rem !important;
  }
  @media ${variables.device.mobile} {
    margin-bottom: ${({ isOurServiceTemplate }) =>
      isOurServiceTemplate ? ` ${variables.pxToRem(32)}!important` : '0.5rem!important'};
  }

  & .avatar1 {
    max-height: 306px;
    opacity: 1;
    @media ${variables.device.laptop} {
      max-height: 265px;
    }
    @media ${variables.device.tablet} {
      max-height: 364px;
    }
    @media ${variables.device.mobile} {
      max-height: ${({ isOurServiceTemplate }) => (isOurServiceTemplate ? '364px' : '168px')};
    }
  }

  & .avatar2 {
    position: absolute;
    opacity: 0;
    top: 0;
    height: 306px;
    @media ${variables.device.laptop} {
      max-height: 265px;
    }
    @media ${variables.device.tablet} {
      max-height: 364px;
    }
    @media ${variables.device.mobile} {
      max-height: ${({ isOurServiceTemplate }) => (isOurServiceTemplate ? '364px' : '168px')};
    }
  }
`
const OurServiceLink = styled(Link)`
  display: block;
  text-align: center;
  text-decoration: underline;
  font: normal normal bold ${variables.pxToRem(18)} / ${variables.pxToRem(22)} Montserrat;
  letter-spacing: 0px;
  color: #0a0a0a;
  opacity: 1;
  padding-top: ${variables.pxToRem(104)};
  & :hover {
    color: ${variables.color.primary};
  }
  @media ${variables.device.tablet} {
    padding-top: ${variables.pxToRem(65)};
  }
`

interface TeamMembersProps {
  authorIdsArray?: string[]
  isOurServiceTemplate?: boolean
}

const TeamMembers = ({ authorIdsArray, isOurServiceTemplate = false }: TeamMembersProps) => {
  const { width } = useWindowSize()
  const members = useAuthors({ authorIdsArray })
  const initNumber = width <= 581 ? 4 : 8
  const [numberOfMembers, setNumberOfMembers] = useState(isOurServiceTemplate ? initNumber : members.length)

  return (
    <TeamMembersSection isOurServiceTemplate={isOurServiceTemplate!}>
      <Container>
        {members.slice(0, numberOfMembers).map(member => {
          return (
            <TeamMember isOurServiceTemplate={isOurServiceTemplate!} key={member.authorId}>
              <Link to={routeLinks.aboutUs(member)}>
                <AvatarWrapper isOurServiceTemplate={isOurServiceTemplate!}>
                  <GatsbyImage
                    image={getImage(member.avatar)!}
                    alt={member.name}
                    className='avatar1'
                    imgClassName='image'
                  />
                  <GatsbyImage
                    image={getImage(member.avatar_hover)!}
                    alt={member.name}
                    className='avatar2'
                    imgClassName='image'
                  />
                </AvatarWrapper>
                <div>
                  <p>
                    <strong>{member.shortName}</strong>
                  </p>
                  <p>{member.bio}</p>
                  <p>{member?.hobby}</p>
                </div>
              </Link>
            </TeamMember>
          )
        })}

        {width <= 581 && !isOurServiceTemplate ? <ScrollArrow /> : null}
        {isOurServiceTemplate && initNumber ? (
          <OurServiceLink to={routeLinks.aboutUs({ page: 'team' })}>see all team members</OurServiceLink>
        ) : null}
      </Container>
    </TeamMembersSection>
  )
}

export default TeamMembers
