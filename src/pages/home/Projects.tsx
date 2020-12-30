import { useStaticQuery } from 'gatsby'
import React from 'react'

import { MoreButton, Section, SectionTitle } from '../shared'
import SuccessStoryBox from './SuccessStoryBox'
import GQL from './Projects.gql'
import { routeLinks } from '../../config/routing'

export const Projects: React.FC = () => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(GQL)
  const posts: Array<{
    frontmatter: {
      image: string
      layout: string
      published: boolean | null
      slug: string
      title: string
    }
    fields: {
      slug
    }
  }> = edges.map(v => v.node)

  return (
    <Section>
      <SectionTitle>our services</SectionTitle>
      <div className="columns is-multiline">
        {posts.map(post => (
          <div className="column is-6" key={'post' + post.frontmatter.title}>
            <SuccessStoryBox
              title={post.frontmatter.title}
              image={post.frontmatter.image}
              slug={post.fields.slug}
            />
          </div>
        ))}
        <MoreButton href={routeLinks.projects}>view more</MoreButton>
      </div>
    </Section>
  )
}
