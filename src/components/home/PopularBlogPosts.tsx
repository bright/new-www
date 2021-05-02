import { useStaticQuery, graphql } from "gatsby"
import React, { FC } from "react"
import styled from "styled-components"
import { MoreButton, Section, SectionTitle } from "../shared"
import PopularBlogPostBox from "../subcomponents/PopularBlogPostBox"
import { routeLinks } from '../../config/routing'

export interface PopularBlogPostsProps {}

const PopularBlogPosts: FC<PopularBlogPostsProps> = props => {
  const {
    posts: { edges: posts },
  } = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        filter: {
          frontmatter: {
            layout: { eq: "post" }
            published: { ne: false }
            hidden: { ne: true }
          }
        }
        sort: { fields: fileAbsolutePath, order: DESC }
        limit: 4
      ) {
        edges {
          post: node {
            id
            fileAbsolutePath
            timeToRead
            excerpt(pruneLength: 500)
            frontmatter {
              excerpt
              comments
              image {
                  childImageSharp {
                      gatsbyImageData
                  }
              }
              author
              title
              tags
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Section>
      <SectionTitle className="is-size-3">what’s new on our blog</SectionTitle>
      <div className="columns is-multiline is-12">
        {posts.map(({ post }: any) => {
          return (
            <div className="column is-6" key={post.frontmatter.title}>
              <PopularBlogPostBox
                date={post.frontmatter.date}
                tags={post.frontmatter.tags}
                image={post.frontmatter.image}
                url={post.fields.slug}
                title={post.frontmatter.title}
                key={"post" + post.frontmatter.title}
              >
                {post.id}
              </PopularBlogPostBox>
            </div>
          )
        })}
      </div>
      <MoreButton href={routeLinks.blog}>read more</MoreButton>
    </Section>
  )
}

export default PopularBlogPosts
