import { useStaticQuery, Link, graphql } from "gatsby"
import React, { FC } from "react"
import styled from "styled-components"
import { Button, Section, SectionTitle } from "../shared"
import PopularBlogPostBox from "../subcomponents/PopularBlogPostBox"
import { routeLinks } from '../../config/routing'

const ButtonContainer = styled.div`
  margin-top: 3.5rem;
`

export interface PopularBlogPostsProps {}

const PopularBlogPosts: FC<PopularBlogPostsProps> = props => {
  const {
    posts: { edges: posts },
    authors: { nodes: authors },
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
              image
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
      authors: allMarkdownRemark(
        filter: { frontmatter: { author_id: { ne: null } } }
      ) {
        nodes {
          author: frontmatter {
            author_id
            avatar
            bio
            name
            web
          }
        }
      }
    }
  `)

  return (
    <Section>
      <SectionTitle className="is-size-3">what’s new on our blog</SectionTitle>
      <div className="columns is-multiline is-12">
        {posts.map(({ post }) => {
          const { author } = authors.find(
            ({ author }) => author.author_id === post.frontmatter.author
          )
          return (
            <div className="column is-6" key={post.frontmatter.title}>
              <PopularBlogPostBox
                author={author.name}
                authorId={author.author_id}
                avatar={author.avatar}
                date={post.frontmatter.date}
                tags={post.frontmatter.tags}
                image={post.frontmatter.image}
                readTime={post.timeToRead}
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
      <ButtonContainer className="has-text-centered">
        <Link to={routeLinks.blog}>
          <Button>read more</Button>
        </Link>
      </ButtonContainer>
    </Section>
  )
}

export default PopularBlogPosts
