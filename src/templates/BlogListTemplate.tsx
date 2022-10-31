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
import { CustomPageTitle, CustomSection, PageTitle } from '../components/shared/index.styled'
import BlogTagsAll from './blog/BlogTagsAll'
import { routeLinks } from '../config/routing'
import ScrollToTop from '../components/subcomponents/ScrollToTop'
import NewsletterWrapper from '../components/subcomponents/NewsletterWrapper'

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

      <CustomSection
        paddingProps='3rem 15rem 0rem '
        paddingLaptop='3rem 6rem 0'
        paddingTabletXL='3rem 9rem 0'
        paddingTablet='3rem 2.25rem 0rem'
        paddingMobileProps='3rem 1.125rem 0rem'
      >
        <CustomPageTitle
          laptopFontSize='2.75rem'
          tabletXLFontSize='2.375rem'
          tabletFontSize='2.375rem'
          mobileFontSize='2rem'
        >
          {' '}
          <span>bright</span> devs blog
        </CustomPageTitle>
        <BlogTagsAll activeTag='' activeSubTag='' />
        <HideTablet>
          {/*<PageDescription>*/}
          {/*  Get up-to-date news on Bright Inventions. Discover all the*/}
          {/*  latest about technologies we use, solutions we create and*/}
          {/*  our culture. Because we believe that knowledge sharing is*/}
          {/*  important not only inside the team.*/}
          {/*</import { routeLinks } from './../config/routing';
PageDescription> */}
        </HideTablet>
        <BlogFeed posts={createBlogPosts(data)} />
        <ScrollToTop />
        <Paging pageContext={pageContext} baseURI={`${routeLinks.blog}/`} />
        <NewsletterWrapper />
      </CustomSection>
    </Page>
  )
}

export const pageQuery = graphql`
  query MyQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { frontmatter: { layout: { eq: "post" }, published: { ne: false }, hidden: { ne: true } } }
      sort: {fields: fields___modifiedAt, order: DESC}
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          internal {  contentFilePath  }
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
            meaningfullyUpdatedAt
            update_date
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
