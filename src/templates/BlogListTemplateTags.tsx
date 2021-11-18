import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'

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
import { routeLinks } from '../config/routing'
import { kebabCase } from '../helpers/pathHelpers'
import ScrollToTop from '../components/subcomponents/ScrollToTop'

interface Props {
  data: GQLData
  pageContext: PageContext
}

const BlogTagsPage: React.FC<Props> = ({ data, pageContext, ...props }) => {
  const kebabCaseTag = pageContext.tag && kebabCase(pageContext.tag.toLowerCase())
  const kebabCaseSubTag = pageContext.subTag && kebabCase(pageContext.subTag.toLowerCase())
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

          <BlogTagsAll activeTag={pageContext.tag} activeSubTag={pageContext.subTag} />
          {/*<PageDescription>*/}
          {/*  Get up-to-date news on Bright Inventions. Discover all the*/}
          {/*  latest about technologies we use, solutions we create and*/}
          {/*  our culture. Because we believe that knowledge sharing is*/}
          {/*  important not only inside the team.*/}
          {/*</import { grabMatchParams } from './../../.cache/find-path';
PageDescription> import { useEffect, useState } from 'react';
*/}

          <BlogFeed posts={createBlogPosts(data)} />
          <ScrollToTop />
          {pageContext.numPages > 1 && (
            <Paging
              pageContext={pageContext}
              baseURI={
                pageContext.subTag
                  ? `${routeLinks.blogTags({ tag: kebabCaseTag })}${kebabCaseSubTag}/`
                  : `${routeLinks.blogTags({ tag: kebabCaseTag })}`
              }
            />
          )}
        </Section>
      </div>
    </Page>
  )
}

export const pageQuery = graphql`
  query MyQueryy($groupTags: [String!]!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          layout: { eq: "post" }
          published: { ne: false }
          hidden: { ne: true }
          tags: { in: $groupTags }
        }
      }
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

export default BlogTagsPage
