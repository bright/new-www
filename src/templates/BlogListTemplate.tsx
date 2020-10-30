import {graphql} from 'gatsby'
import React from 'react'

import {Page} from '../layout/Page'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import {BlogFeed} from './blog/feed'
import {GQLData} from '../models/gql'
import {createBlogPosts} from '../models/creator'

import '../styles/_blog.scss'

interface Props {
  data: GQLData
  pageContext: {
    currentPage: 2
    limit: 10
    numPages: 21
    skip: 10
  }
}

const BlogPage: React.FC<Props> = ({data, pageContext,}) => {
  return (
    <Page className="page-blog-list">
      <HelmetWrapper
        title="Blog"
        description="Ideas about software development, practices. Coding examples in Swift, Kotlin, Android, iOS, Backend, Node.js, SQL, AWS and more."
      />

      <div className="container">
        <section className="section">
          <h1 className="title has-text-dark">Bright Devs Blog</h1>
          <BlogFeed posts={createBlogPosts(data)} />
          <div className="is-flex has-justify-content-space-between">
            {pageContext.currentPage > 1 && (
              <a
                href={
                  "/blog/" +
                  (pageContext.currentPage - 1 > 1
                    ? pageContext.currentPage - 1
                    : "")
                }
                className="button"
              >
                <span className="icon">
                  <svg
                    className="w-pagination-previous-icon"
                    height="12px"
                    width="12px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    transform="translate(0, 1)"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      fillRule="evenodd"
                      d="M8 10L4 6l4-4"
                    />
                  </svg>
                </span>
                <span>Previous</span>
              </a>
            )}
            {pageContext.numPages > pageContext.currentPage && (
              <a
                href={"/blog/" + (pageContext.currentPage + 1)}
                className="button"
              >
                <span>Next</span>
                <span className="icon">
                  <svg
                    className="w-pagination-next-icon icon-7"
                    height="12px"
                    width="12px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    transform="translate(0, 1)"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      fillRule="evenodd"
                      d="M4 2l4 4-4 4"
                    />
                  </svg>
                </span>
              </a>
            )}
          </div>
        </section>
      </div>
    </Page>
  )
}

export const pageQuery = graphql`
  query MyQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          layout: { eq: "post" }
          published: { ne: false }
          hidden: { ne: true }
        }
      }
      sort: { fields: fileAbsolutePath, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fileAbsolutePath
          excerpt(pruneLength: 500)
          frontmatter {
            excerpt
            comments
            image
            author
            author_id
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
`

export default BlogPage
