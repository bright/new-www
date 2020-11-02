import {graphql} from 'gatsby'
import React from 'react'

import {Page} from '../layout/Page'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import {BlogFeed} from './blog/Feed'
import {GQLData} from '../models/gql'
import {createBlogPosts} from '../models/creator'
import {PageContext, Paging} from './blog/Paging'

interface Props {
  data: GQLData
  pageContext: PageContext
}

const BlogPage: React.FC<Props> = ({data, pageContext}) => {
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
          <Paging {...pageContext} />
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
