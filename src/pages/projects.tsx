import { graphql } from 'gatsby'
import React, { useState } from 'react'
import classNames from 'classnames'

import { Page } from '../layout/Page'
import { CustomSectionInner, CustomPageTitle, CustomSection, CustomTextRegular } from '../components/shared'
import { createProjects } from '../models/creator'
import { GQLData } from '../models/gql'
import styled from 'styled-components'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import variables from '../styles/variables'
import { TagsSelect, TagsWrapper } from './../components/shared/components/index'
import { useWindowSize } from '../components/utils/use-windowsize'
import { Projects } from '../components/home/Projects'
import { Contact } from '../components/shared/Contact'

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
    border: 1px solid #f7931e;
  }
  &::first-letter {
    text-transform: lowercase;
  }
`

const ProjectsPage: React.FC<{ data: GQLData }> = ({ data }) => {
  const projects = createProjects(data)

  const allTags: string[] = []
  projects.forEach(project =>
    (project.tags || []).forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag)
      }
    })
  )

  const [selectedTag, setSelectedTag] = useState<string[]>([])

  const selectTag = (tag: string) => {
    setSelectedTag([tag])
  }
  const handleOnChange = ({ target }) => {
    const { value } = target
    if (value == 'allTags') {
      setSelectedTag([])
    } else {
      setSelectedTag([value])
    }
  }

  const { width } = useWindowSize()
  const breakpoint = 769

  const filteredProjects = projects.filter(
    project => selectedTag.length === 0 || (project.tags && selectedTag.every(tag => project.tags.includes(tag)))
  )
  console.log(filteredProjects.length % 2)
  return (
    <Page>
      <HelmetTitleDescription
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
        {width < breakpoint ? (
          <>
            {allTags.length > 0 && (
              <TagsSelect onChange={handleOnChange}>
                <option
                  className={classNames('project-tag', { ['is-active']: selectedTag.length === 0 })}
                  value={'allTags'}
                >
                  all areas
                </option>
                {allTags.map(tag => (
                  <option
                    key={tag}
                    className={classNames('project-tag', { ['is-active']: selectedTag.includes(tag) })}
                    value={tag}
                  >
                    {tag}
                  </option>
                ))}
              </TagsSelect>
            )}
          </>
        ) : (
          <TagsWrapper>
            {allTags.length > 0 && (
              <li
                className={classNames('project-tag', { ['is-active']: selectedTag.length === 0 })}
                onClick={() => setSelectedTag([])}
              >
                all
              </li>
            )}
            {allTags.map(tag => (
              <li
                key={tag}
                className={classNames('project-tag', { ['is-active']: selectedTag.includes(tag) })}
                onClick={() => selectTag(tag)}
              >
                {tag}
              </li>
            ))}
          </TagsWrapper>
        )}
      </SectionProjects>
      <Projects isFetchProject={false} projectsArray={filteredProjects} />
      <Contact formButton='Business Contact Form Button' actionFormButton='Click Submit Business Form' />
    </Page>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { layout: { eq: "project" } } }) {
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
