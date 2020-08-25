import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Button, Section, SectionTitle } from "../shared"
import SuccessStoryBox from "./SuccessStoryBox"
import styled from "styled-components"

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
          }
        }
      }
    }
  `)
  const posts: Array<{
    image: string
    layout: string
    published: boolean | null
    slug: string
    title: string
  }> = query.allMarkdownRemark.edges.map(v => v.node.frontmatter)

  return (
    <Section>
      <SectionTitle className="is-size-3">success stories</SectionTitle>
      <div className="columns is-multiline">
        {posts.map(post => (
          <div className="column is-6" key={"post" + post.title}>
            <SuccessStoryBox title={post.title} image={post.image} />
          </div>
        ))}
        <ButtonContainer className="column is-full has-text-centered">
          <Button>view more</Button>
        </ButtonContainer>
      </div>
    </Section>
  )
}

export default SuccessStories
