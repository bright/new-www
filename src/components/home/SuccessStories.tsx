import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Button, Section, SectionTitle } from "../shared"
import SuccessStoryBox from "./SuccessStoryBox"

const SuccessStories: React.FC = () => {
  const query = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { layout: { eq: "project" }, published: { ne: false } }
        }
        limit: 6
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
  console.log(query)
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
          <div className="column is-6">
            <SuccessStoryBox title={post.title} image={post.image} />
          </div>
        ))}
        <div className="column is-full has-text-centered">
          <Button>view more</Button>
        </div>
      </div>
    </Section>
  )
}

export default SuccessStories
