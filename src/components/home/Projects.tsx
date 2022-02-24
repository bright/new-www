import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import { CustomContainer, CustomSection, CustomSectionTitle, MoreButton, Section, SectionTitle } from '../shared'
import SuccessStoryBox from './SuccessStoryBox'
import { routeLinks } from '../../config/routing'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { ProjectModel } from '../../models/gql'
import ScrollToTop from '../subcomponents/ScrollToTop'

export const ProjectCustomSection = styled(CustomSection)`
  @media ${variables.device.laptop} {
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

  & :first-of-type:not(div.down) {
    margin-right: 0;
    margin-top: 0;
  }

  & :last-of-type:not(div.down) {
    margin-left: 0;
  }

  span {
    flex-grow: 1;
    font-size: ${variables.font.customtext.size};
    color: ${variables.color.text};
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
    margin: 0 0 0.5625rem;
    span {
      font-size: 0.75rem;
    }

    img {
      width: 100%;
    }
    & :last-of-type:not(div.down) {
      border: 1px solid #0a0a0a;
    }
  }
  @media ${variables.device.mobile} {
    width: 100%;
    min-height: auto;
    height: auto;
    padding: 1.5rem;
    font-size: 0.75rem;

    span {
      font-size: 0.75rem;
    }

    img {
      width: 100%;
    }
    & :first-of-type:not(div.down) {
      margin-bottom: 0.5625rem;
    }
    & :last-of-type:not(div.down) {
      margin-top: 0.5625rem;
      margin-bottom: 0;
    }
  }
`
export const ProjectsLink = styled.a`
  font-size: ${variables.font.customtext.size};
  line-height: 1.6875rem;
  font-weight: 700;
  color: var(--black);
  display: block;
  & div {
    margin-bottom: 0;
    margin-left: 0;
  }
  & div.full-height {
    height: ${variables.pxToRem(507)};
    margin-right: 0;
    margin-left: 2rem;
  }
  @media ${variables.device.laptop} {
    & div.full-height {
      height: ${variables.pxToRem(407)};
      margin-right: 0;
      margin-left: 1.75rem;
    }
  }
  @media ${variables.device.tabletXL} {
    & div.full-height {
      height: ${variables.pxToRem(330.88)};
      margin-right: 0;
      margin-left: 1.41rem;
    }
  }
  @media ${variables.device.tablet} {
    & div {
      margin: 0.5625rem 0 0 0;
      border: 1px solid #0a0a0a;
    }
    & div.full-height {
      height: auto;
      margin-right: 0;
      margin-left: 1.75rem;
    }
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.font.customtext.sizeMobile};
  }
`

interface ProjectsProps {
  isFetchProject?: boolean
  projectsArray?: Array<ProjectModel>
  isTagsEmpty?: boolean
}

export const Projects: React.FC<ProjectsProps> = ({ isFetchProject = true, projectsArray = [], isTagsEmpty }) => {
  let projects: Array<ProjectModel> = []

  if (isFetchProject) {
    const {
      allMarkdownRemark: { edges },
    } = useStaticQuery(GQL)

    projects = edges.map((v: any) => v.node.frontmatter)
  } else {
    projects = projectsArray!
  }

  return (
    <ProjectCustomSection paddingProps=' 0rem 15rem 4rem 15rem'>
      {isFetchProject && <CustomSectionTitle>success stories</CustomSectionTitle>}
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

        {projects.map((project, ix) => {
          const { title, image, slug, layout, published } = project
          const currentProject: ProjectModel = { title, image, slug, layout, published: published ? 'true' : 'false' }

          return (
            <SuccessStoryBox key={ix} project={currentProject} className={`is-pulled-${ix % 2 ? 'right' : 'left'}`} />
          )
        })}
        <ScrollToTop />
        {isTagsEmpty ? (
          <BlockSmall className='is-pulled-left'>
            <span>Follow us on:</span>
            <a target='_blank' href='https://www.linkedin.com/company/bright-inventions/'>
              <img src='/images/social/linkedIn.svg' alt='LinkedIn' />
            </a>
            <a target='_blank' href='https://www.facebook.com/bright.inventions/'>
              <img src='/images/social/facebook.svg' alt='Facebook' />
            </a>
            <a target='_blank' href='https://www.instagram.com/bright_inventions/'>
              <img src='/images/social/instagram.svg' alt='Instagram' />
            </a>
          </BlockSmall>
        ) : (
          <ProjectsLink href={routeLinks.projects}>
            <BlockSmall
              className={`${projects.length % 2 ? 'down is-pulled-right full-height' : ' is-pulled-left  down '}`}
            >
              see all case studies
            </BlockSmall>
          </ProjectsLink>
        )}
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
