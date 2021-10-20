import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { routeLinks } from '../../config/routing'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { useAuthors } from '../../use-authors/use-authors'
import variables from '../../styles/variables'

const TeamMember = styled.article`
  border: 1px solid rgba(0, 0, 0, 0.125);
  color: black;
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
    flex-basis: calc(50% - 1rem);
    margin: 2rem 2rem 0 0;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
    &:nth-of-type(n + 1) {
      margin-top: 0;
    }
    &:nth-of-type(n + 3) {
      margin-top: 2rem;
    }
  }

  && a {
    display: grid;
    color: black;
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
        color: #131214;
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
          font-size: 1rem;
          line-height: 1.125rem;
        }
        p:nth-child(2) {
          font-size: 0.75rem;
          line-height: 0.9375rem;
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
      @media ${variables.device.mobile} {
        width: 94px;
        height: 168px;
        max-height: 168px;
      }
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
const TeamMembersSection = styled.div`
  @media ${variables.device.mobile} {
    padding: 0 0.5rem;
  }
`

const AvatarWrapper = styled.figure`
  position: relative;
  transition: all 0.3s;
  margin-bottom: 1.125rem !important;
  @media ${variables.device.tablet} {
    margin-bottom: 2.1875rem !important;
  }
  @media ${variables.device.mobile} {
    margin-bottom: 0.5rem !important;
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
      max-height: 168px;
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
      max-height: 168px;
    }
  }
`
const TeamMembers = () => {
  const members = useAuthors()

  return (
    <TeamMembersSection>
      <Container>
        {members.map(member => {
          return (
            <TeamMember key={member.authorId}>
              <Link to={routeLinks.aboutUs(member)}>
                <AvatarWrapper>
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
                  {/* <StaticImage
                    src='../../../static/images/krzysiek_s_2_team.png'
                    alt='A dinosaur'
                    placeholder='blurred'
                    className='avatar2'
                    imgClassName='image'
                  /> */}
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
      </Container>
    </TeamMembersSection>
  )
}

export default TeamMembers
