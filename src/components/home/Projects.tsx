import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { MoreButton, Section, SectionTitle } from '../shared'
import SuccessStoryBox from './SuccessStoryBox'
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
      slug: string
    }
  }> = edges.map((v: any) => v.node)

  return (
    <Section>
      <SectionTitle>success stories</SectionTitle>
      <div className="columns is-multiline has-justify-content-center">
        {posts.map(post => (
            <SuccessStoryBox
              className="column is-6"
              key={'post' + post.frontmatter.title}
              title={post.frontmatter.title}
              image={post.frontmatter.image}
              slug={post.fields.slug}
            />
        ))}
      </div>
      <MoreButton href={routeLinks.projects}>view more</MoreButton>
    </Section>
  )
}

const GQL = graphql`
  {
      allMarkdownRemark(
        filter: {
          frontmatter: { layout: { eq: "project" }, published: { ne: false } }
        }
        limit: 6
        sort: { order: ASC, fields: frontmatter___order }
      ) {
        edges {
          node {
            frontmatter {
              title
              image
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