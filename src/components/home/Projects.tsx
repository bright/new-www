import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { MoreButton, Section, SectionTitle } from '../shared'
import SuccessStoryBox from './SuccessStoryBox'
import { routeLinks } from '../../config/routing'
import { IGatsbyImageData } from 'gatsby-plugin-image'

export const Projects: React.FC = () => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(GQL)
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
    <Section>
      <SectionTitle>success stories</SectionTitle>
      <div className="columns is-multiline has-justify-content-center">
        {projects.map((project, ix) => (
            <SuccessStoryBox
              className="column is-6"
              key={ix}
              title={project.frontmatter.title}
              image={project.frontmatter.image}
              slug={project.frontmatter.slug}
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
