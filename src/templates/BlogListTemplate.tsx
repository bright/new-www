import { graphql } from 'gatsby'
import React from 'react'

import { Page } from '../layout/Page'
import { BlogFeed } from './blog/Feed'
import { GQLData } from '../models/gql'
import { createBlogPosts } from '../models/creator'
import { PageContext, Paging } from './blog/Paging'
import { HideTablet, PageDescription, Section } from '../components/shared'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import Helmet from 'react-helmet'
import { resolveUrl } from '../meta/resolve-url'
// @ts-ignore
import blogPostDefaultImage from '../../static/images/dummy/blog_post.png'
import { PageTitle } from '../components/shared/index.styled'
import BlogTagsAll from './blog/BlogTagsAll'

interface Props {
  data: GQLData
  pageContext: PageContext
}

const BlogPage: React.FC<Props> = ({ data, pageContext }) => {
  return (
    <Page className='page-blog-list'>
      <HelmetTitleDescription
        title='Blog about web & mobile app development'
        description='Articles about software development, agile and project management. Coding examples in Swift, Kotlin, Android, iOS, Backend, Node.js, SQL, AWS and more.'
      />
      <Helmet>
        <meta property='og:image' content={resolveUrl(blogPostDefaultImage)} />
      </Helmet>

      <div className='container'>
        <Section>
          <PageTitle>
            {' '}
            <span>bright</span> devs blog
          </PageTitle>
          <BlogTagsAll activeTag='' />
          <HideTablet>
            {/*<PageDescription>*/}
            {/*  Get up-to-date news on Bright Inventions. Discover all the*/}
            {/*  latest about technologies we use, solutions we create and*/}
            {/*  our culture. Because we believe that knowledge sharing is*/}
            {/*  important not only inside the team.*/}
            {/*</PageDescription> */}
          </HideTablet>
          <BlogFeed posts={createBlogPosts(data)} />
          <Paging pageContext={pageContext} isSelectedTags={false} />
        </Section>
      </div>
    </Page>
  )
}

export const pageQuery = graphql`
  query MyQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "post" }, published: { ne: false }, hidden: { ne: true } } }
      sort: { fields: frontmatter___date, order: DESC }
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
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
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
