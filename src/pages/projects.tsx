import { graphql } from 'gatsby'
import React, {useState} from 'react'
import classNames from 'classnames'

import {Page} from '../layout/Page'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import ProjectCard, {ProjectGraphql} from '../components/subcomponents/ProjectCard'

import styles from './projects.module.scss'

const ProjectsPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const projects: ProjectGraphql[] = edges
      .map(({ node: { frontmatter } }: {node: {frontmatter: ProjectGraphql}}) => frontmatter)
      .filter((project: ProjectGraphql) => project.published)
      .sort((a: ProjectGraphql, b: ProjectGraphql) => (a.order || 99) - (b.order || 99))

  const allTags: string[] = []
  projects.forEach(project => (project.tags || []).forEach(tag => {
    if (!allTags.includes(tag)) {
      allTags.push(tag)
    }
  }))

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
      <HelmetWrapper
        title='Projects'
        description='About our software development projects'
      />
      <div className='container'>
        <div className={classNames('section', styles.info)}>
          <div className='content'>
            Since 2012 we have realized many innovative projects among which
            there are solutions supporting eco-driving, application for
            sportsmen, POS cash register, system supporting answering calls to
            emergency numbers and many others.
          </div>
          <div className='buttons'>
            {allTags.length > 0 && (
                <div className={classNames('button', styles.filter, {['is-black']: selectedTags.length === 0})}
                     onClick={() => setSelectedTags([])}>
                  all
                </div>
            )}
            {allTags.map(tag => (
                <div key={tag}
                     className={classNames('button',  styles.filter, {['is-black']: selectedTags.includes(tag)})}
                     onClick={() => selectTag(tag)}>
                  {tag}
                </div>
            ))}
          </div>
        </div>
        <div className='section'>
          <div className='columns is-multiline'>
            {projects
                .filter((project) =>
                    selectedTags.length === 0 ||
                    (project.tags && selectedTags.every(tag => project.tags.includes(tag)))
                )
                .map((project) => (
                  <div className={classNames('column', styles.project)} key={project.title}>
                      <ProjectCard project={project} />
                  </div>
                ))
            }
          </div>
        </div>
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
            image
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
