import { graphql } from 'gatsby'
import React, {useState} from 'react'
import classNames from 'classnames'

import Layout from '../components/layout'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import ProjectCard, {ProjectGraphql} from '../components/subcomponents/ProjectCard'

const ProjectsPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const projects: ProjectGraphql[] = edges
      .map(({ node: { frontmatter } }: {node: {frontmatter: ProjectGraphql}}) => frontmatter)
      .filter((project: ProjectGraphql) => project.published)

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
    <Layout>
      <HelmetWrapper
        title='Projects'
        description='About our software development projects'
      />
      <div className='container'>
        <div className='section'>
          <div className='content'>
            Since 2012 we have realized many innovative projects among which
            there are solutions supporting eco-driving, application for
            sportsmen, POS cash register, system supporting answering calls to
            emergency numbers and many others.
          </div>
          <div className='buttons'>
            {allTags.length > 0 && (
                <div className={classNames('button', {['is-black']: selectedTags.length === 0})}
                     onClick={() => setSelectedTags([])}>
                  all
                </div>
            )}
            {allTags.map(tag => (
                <div key={tag}
                     className={classNames('button', {['is-black']: selectedTags.includes(tag)})}
                     onClick={() => selectTag(tag)}>
                  {tag}
                </div>
            ))}
          </div>
          <div>
            <div className='columns is-multiline'>
              {projects.map((project) => (
                <div className='column is-one-third' key={project.title}>
                    <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
          }
        }
      }
    }
  }
`

export default ProjectsPage
