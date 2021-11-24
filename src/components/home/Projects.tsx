import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import { CustomContainer, CustomSection, CustomSectionTitle, MoreButton, Section, SectionTitle } from '../shared'
import SuccessStoryBox from './SuccessStoryBox'
import { routeLinks } from '../../config/routing'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import styled from 'styled-components'
import variables from '../../styles/variables'

export const ProjectCustomSection = styled(CustomSection)`
  padding-bottom: 11.625rem;
  @media ${variables.device.laptop} {
    padding-bottom: 7.25rem;
    & .success-story-wrapper {
      & > div:nth-child(odd) {
        margin-right: 0;
      }
      & > div:nth-child(even) {
        margin-left: 0;
      }
    }
  }
  @media ${variables.device.mobile} {
    padding-bottom: 5.125rem;
  }
`

export const BlockSmall = styled.div`
  width: calc(50% - 2rem);
  border: 1px solid ${variables.color.border};
  height: 9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 2rem;
  font-size: 1rem;
  &:last-of-type {
    margin-bottom: 0;
    margin-left: 0;
  }
  &:first-of-type {
    margin-right: 0;
  }

  span {
    flex-grow: 1;
    font-size: ${variables.font.customtext.size};
    color: #131214;
    margin-right: 2rem;
  }
  & a {
    margin-right: 2rem;
    &:last-of-type {
      margin-right: 0;
    }
    img {
      width: 2rem;
    }
  }
  @media ${variables.device.laptop} {
    width: calc(50% - 1.75rem);
    margin: 1.75rem;
  }
  @media ${variables.device.tabletXL} {
    width: calc(50% - 1.41rem);
    margin: 1.41rem;
  }
  @media ${variables.device.tablet} {
    width: 100%;
    min-height: auto;
    height: auto;
    padding: 1.5rem;
    font-size: 0.75rem;
    margin: 0 auto;

    span {
      font-size: 0.75rem;
    }

    img {
      width: 100%;
    }
  }
  @media ${variables.device.mobile} {
    width: 100%;
    min-height: auto;
    height: auto;
    padding: 1.5rem;
    font-size: 0.75rem;
    margin: 0 auto;

    span {
      font-size: 0.75rem;
    }

    img {
      width: 100%;
    }
  }
`
export const ProjectsLink = styled(Link)`
  font-size: ${variables.font.customtext.size};
  line-height: 1.6875rem;
  font-weight: 700;
  color: var(--black);
  @media ${variables.device.mobile} {
    font-size: ${variables.font.customtext.sizeMobile};
  }
`

export const Projects: React.FC = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(GQL)
  const projects: Array<{
    frontmatter: {
      image: IGatsbyImageData
      layout: string
      published: boolean | null
      slug: string
      title: string
    }
    fields: {
      slug: string
    }
  }> = edges.map((v: any) => v.node)

  return (
    <ProjectCustomSection>
      <CustomSectionTitle>success stories</CustomSectionTitle>
      <div className='is-clearfix success-story-wrapper'>
        <BlockSmall className='is-pulled-right'>
          <span>visit our online portfolio:</span>
          <a target='_blank' href='https://www.behance.net/BrightInventions/'>
            <img src='/images/success-story-home-page/behance.svg' alt='Behance' />
          </a>
          <a target='_blank' href='https://dribbble.com/Bright_Inventions/'>
            <img src='/images/success-story-home-page/icon2.svg' alt='Dribbble' />
          </a>
        </BlockSmall>

        {projects.map((project, ix) => (
          <>
            <SuccessStoryBox
              key={ix}
              title={project.frontmatter.title}
              image={project.frontmatter.image}
              slug={project.frontmatter.slug}
              className={`is-pulled-${ix % 2 ? 'right' : 'left'}`}
            />
          </>
        ))}
        <BlockSmall className='is-pulled-left'>
          <ProjectsLink to={routeLinks.projects}>see all case studies</ProjectsLink>
        </BlockSmall>
      </div>
    </ProjectCustomSection>
  )
}

const GQL = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "project" }, published: { ne: false } } }
      limit: 6
      sort: { order: ASC, fields: frontmatter___order }
    ) {
      edges {
        node {
          frontmatter {
            title
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            layout
            slug
            published
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
