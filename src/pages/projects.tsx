import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { Page } from '../layout/Page'
import { CustomPageTitle, CustomSection, CustomSectionInner, CustomTextRegular } from '../components/shared'
import { createProjects } from '../models/creator'
import { GQLData } from '../models/gql'
import styled from 'styled-components'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import variables from '../styles/variables'
import { Projects } from '../components/home/Projects'
import { Contact } from '../components/shared/Contact'
import { Tags } from '../projects/Tags/Tags'
import { TagTree } from '../projects/Tags/types'

const SectionProjects = styled(CustomSection)`
  && .project-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    color: ${variables.color.text};
  }

  & li.is-active {
    font-weight: bold;
    border: 1px solid ${variables.color.primary};
  }

  &::first-letter {
    text-transform: lowercase;
  }
`

const ProjectsPage: React.FC<{ data: GQLData }> = ({ data }) => {
  const [selectedTags, setSelectedTags] = useState<TagTree>({})
  const projects = createProjects(data)

  const filteredProjects = projects.filter((project) => {
      for (const group in selectedTags) {
        const common = selectedTags[group]?.some((tag) => project.tags?.includes(tag))

        if (!common) {
          return false
        }
      }

      return true
    }
  )

  return (
    <Page>
      <HelmetMetaData
        title='Projects'
        description='We’ve developed web and mobile applications for clients from UK, Germany, Netherlands, Norway, Israel and more.'
      />

      <CustomSection
        paddingProps='3rem 2rem 1rem 2rem'
        paddingLaptop='3rem 2rem 4rem 2rem'
        paddingTabletXL='3rem 2rem 2rem 2rem'
        paddingTablet='3rem 2rem 2rem 2rem'
        paddingMobileProps='3rem 1.125rem 0rem 1.125rem'
      >
        <CustomPageTitle>
          our <span>success</span> stories
        </CustomPageTitle>
      </CustomSection>
      <SectionProjects paddingMobileProps='2rem 1.125rem 0' paddingProps='2rem 15rem 0 15rem'>
        <CustomSectionInner>
          <CustomTextRegular>
            Since 2012 we have realized many innovative projects among which there are solutions supporting eco-driving,
            application for sportsmen, POS cash register, system supporting answering calls to emergency numbers and
            many others.
          </CustomTextRegular>
        </CustomSectionInner>
      </SectionProjects>
      <CustomSection
        paddingProps='2rem 15rem'
        paddingLaptop='2rem 6rem'
        paddingTabletXL='2rem 9rem'
        paddingTablet='3rem 2rem 2rem 2rem'
        paddingMobileProps='3rem 1.125rem 0rem 1.125rem'
      >
        <Tags value={selectedTags} onChange={(selected) => setSelectedTags(selected)} />
      </CustomSection>
      <Projects
        isFetchProject={false}
        projectsArray={filteredProjects}
        isTagsEmpty={!!projects.length}
        isSelectedTag={!!Object.keys(selectedTags).length}
      />
      <Contact formButton='Business Contact Form Button' actionFormButton='Click Submit Business Form' />
    </Page>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(filter: { frontmatter: { layout: { eq: "project" } } }) {
      edges {
        node {
          frontmatter {
            title
            image {
              childImageSharp {
                gatsbyImageData(height: 900, layout: CONSTRAINED)
              }
            }
            layout
            published
            tags
            slug
            order
          }
        }
      }
    }
  }
`

export default ProjectsPage
