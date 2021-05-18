import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { routeLinks } from '../../config/routing'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useAuthors } from '../../use-authors/use-authors'

const TeamMember = styled.article`
  border: 1px solid rgba(0, 0, 0, 0.125);
  color: black;
  flex-basis: 25%;
  text-align: center;
  display: flex;
  flex-direction: column;
  && a {
    display: grid;
    gap: 1.675rem;
    color: black;
    p {
      margin: 0;
    }

    div {
      display: grid;
      gap: 10px;
      padding-bottom: 42px;
      p strong {
        font-size: 2rem;
        line-height: 39px;
      }
      p:nth-child(2) {
        font-size: 1.25rem;
        line-height: 24px;
      }
      p:last-child {
        font-size: 1.125rem;
        line-height: 22px;
        color: #131214;
        opacity: 0.75;
      }
    }
  }
  && figure {
    margin: 0;
    img {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    && {
      flex-basis: 42%;
    }
  }

  @media (max-width: 601px) {
    && {
      flex-basis: 80%;
    }
  }
`
const Container = styled.div`
  display: flex;
  max-width: 1650px;
  justify-content: center;
  margin: auto;
  flex-wrap: wrap;
  flex: 1;
  gap: 4rem;
  margin-bottom: 122px;
`
const TeamMembers = () => {
  const members = useAuthors()

  return (
    <Container>
      {members.map(member => {
        return (
          <TeamMember key={member.authorId}>
            <Link to={routeLinks.aboutUs(member)}>
              <figure>
                <GatsbyImage image={getImage(member.avatar)!} alt={member.name} />
              </figure>
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
  )
}

export default TeamMembers
