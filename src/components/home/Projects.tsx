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
import { CustomTextRegular } from './../shared/index.styled'
import { pxToRem } from './../../styles/variables'

export const ProjectCustomSection = styled(CustomSection)`
  & .success-story-wrapper {
    & .confidential {
      border: 1px solid #d3d3d3;
      width: calc(50% - 2rem);
      min-height: 10rem;
      height: 713px;
      margin: 2rem 2rem;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      & :hover {
        box-shadow: 15px 15px 40px -25px rgb(170 170 170);
      }
    }
    & > div:nth-child(odd) {
      margin-right: 0;
    }

    & > div:nth-child(even) {
      margin-left: 0;
    }
    & div.full-height {
      height: ${variables.pxToRem(507)};
      margin-right: 0;
      margin-left: 2rem;
    }
  }
  @media ${variables.device.laptop} {
    & .success-story-wrapper {
      & .confidential {
        width: calc(50% - 1.75rem);
        margin: 1.75rem;
        height: 601px;
      }
      & div.full-height {
        height: ${variables.pxToRem(407)};
        margin-right: 0;
        margin-left: 1.75rem;
      }
    }
  }
  @media ${variables.device.tabletXL} {
    & .success-story-wrapper {
      & .confidential {
        width: calc(50% - 1.41rem);
        margin: 1.41rem;
        height: 32.5rem;
      }
      & div.full-height {
        height: ${variables.pxToRem(330.88)};
        margin-right: 0;
        margin-left: 1.41rem;
      }
    }
  }
  @media ${variables.device.tablet} {
    & .success-story-wrapper {
      & .confidential {
        margin: 0.5625rem 0;
        width: 100%;
        height: 571.5px;
      }
      & div.full-height {
        height: auto;
        width: 100%;
        margin: 0.5625rem 0 0;
      }
    }
  }
  @media ${variables.device.mobile} {
    & .success-story-wrapper {
      & .confidential {
        height: 331px;
      }
    }
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
const Confidential = styled.div``
const ConfidentialLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .confidential-wrapper {
    padding: ${variables.pxToRem(210)} ${variables.pxToRem(60)};
    display: flex;
    flex-direction: column;
    gap: ${variables.pxToRem(64)};
    & h4 {
      text-align: center;
      font: normal normal 800 28px/34px Montserrat;
    }
    & p {
      text-align: center;
      color: ${variables.color.text};
      font: normal normal bold 18px/22px Montserrat;
    }
    @media ${variables.device.laptop} {
      padding: ${variables.pxToRem(181)} ${variables.pxToRem(53)};
      gap: ${variables.pxToRem(58)};
      & h4 {
        font: normal normal 800 25px/30px Montserrat;
      }
      & p {
        font: normal normal bold 16px/19px Montserrat;
      }
    }

    @media ${variables.device.tabletXL} {
      padding: ${variables.pxToRem(136)} ${variables.pxToRem(29)};
      gap: ${variables.pxToRem(48)};
    }
    @media ${variables.device.tablet} {
      padding: ${variables.pxToRem(180)} ${variables.pxToRem(140)};
      gap: ${variables.pxToRem(58)};
    }
    @media ${variables.device.mobile} {
      padding: ${variables.pxToRem(86)} ${variables.pxToRem(35)};
      gap: ${variables.pxToRem(43)};
      & p {
        font: normal normal bold 18px/22px Montserrat;
      }
    }
  }
`

const CustomTextConfidential = styled(CustomTextRegular)`
  text-align: center;
  color: ${variables.color.text};
`

interface ProjectsProps {
  isFetchProject?: boolean
  projectsArray?: Array<ProjectModel>
  isTagsEmpty?: boolean
  isSelectedTag?: boolean
}

export const Projects: React.FC<ProjectsProps> = ({
  isFetchProject = true,
  projectsArray = [],
  isTagsEmpty,
  isSelectedTag = true,
}) => {
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
        {isSelectedTag && (
          <Confidential
            className={`${projects.length % 2 ? ' is-pulled-right confidential ' : ' is-pulled-left confidential   '}`}
          >
            <ConfidentialLink to={routeLinks.startProject}>
              <div className='confidential-wrapper'>
                <h4>want to see more?</h4>
                <p>Some of our projects are confidential. Contact us to know more about our expertise.</p>
              </div>
            </ConfidentialLink>
          </Confidential>
        )}
        <ScrollToTop />

        {isTagsEmpty ? (
          <BlockSmall
            className={`${projects.length % 2 ? 'down is-pulled-right full-height' : ' is-pulled-left  down '}`}
          >
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
              className={
                isSelectedTag
                  ? `${(projects.length + 1) % 2 ? 'down is-pulled-right full-height' : ' is-pulled-left  down '}`
                  : `${projects.length % 2 ? 'down is-pulled-right full-height' : ' is-pulled-left  down '}`
              }
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
