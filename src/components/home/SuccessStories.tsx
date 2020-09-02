import { graphql, Link, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Button, Section, SectionTitle } from "../shared"
import SuccessStoryBox from "./SuccessStoryBox"

const ButtonContainer = styled.div`
  margin-top: 2em;
  margin-bottom: 4em;
`

const SuccessStories: React.FC = () => {
  const query = useStaticQuery(graphql`
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
  `)
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
  }> = query.allMarkdownRemark.edges.map(v => v.node)
  console.log(query)
  return (
    <Section>
      <SectionTitle className="is-size-3">success stories</SectionTitle>
      <div className="columns is-multiline">
        {posts.map(post => (
          <div className="column is-6" key={"post" + post.frontmatter.title}>
            <SuccessStoryBox
              title={post.frontmatter.title}
              image={post.frontmatter.image}
              slug={post.fields.slug}
            />
          </div>
        ))}
        <ButtonContainer className="column is-full has-text-centered">
          <Link to="/projects">
            <Button>view more</Button>
          </Link>
        </ButtonContainer>
      </div>
    </Section>
  )
}

export default SuccessStories
