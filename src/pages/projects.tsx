import { graphql } from 'gatsby'
import React, { useState } from 'react'
import classNames from 'classnames'

import { Page } from '../layout/Page'
import ProjectCard from '../components/subcomponents/ProjectCard'
import { Section, PageDescription } from '../components/shared'
import { createProjects } from '../models/creator'
import { GQLData } from '../models/gql'

import * as styles from './projects.module.scss'
import styled from 'styled-components'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import variables from '../styles/variables'

const SectionProjects = styled(Section)`
  && .button {
    color: ${variables.color.text};
  }
  & .button.is-black {
    background-color: #0a0a0a;
    border-color: transparent;
    color: #fff;
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

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const selectTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <Page>
      <HelmetTitleDescription
        title='Projects'
        description='We’ve developed web and mobile applications for clients from UK, Germany, Netherlands, Norway, Israel and more.'
      />
      <div className='container'>
        <SectionProjects className={styles.info}>
          <PageDescription>
            Since 2012 we have realized many innovative projects among which there are solutions supporting eco-driving,
            application for sportsmen, POS cash register, system supporting answering calls to emergency numbers and
            many others.
          </PageDescription>
          <div className='buttons'>
            {allTags.length > 0 && (
              <div
                className={classNames('button', styles.filter, { ['is-black']: selectedTags.length === 0 })}
                onClick={() => setSelectedTags([])}
              >
                all
              </div>
            )}
            {allTags.map(tag => (
              <div
                key={tag}
                className={classNames('button', styles.filter, { ['is-black']: selectedTags.includes(tag) })}
                onClick={() => selectTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </SectionProjects>
        <Section>
          <div className='columns is-multiline'>
            {projects
              .filter(
                project =>
                  selectedTags.length === 0 || (project.tags && selectedTags.every(tag => project.tags.includes(tag)))
              )
              .map(project => (
                <div className={classNames('column', styles.project)} key={project.title}>
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>
        </Section>
      </div>
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
