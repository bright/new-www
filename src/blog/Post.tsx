import { graphql } from 'gatsby'
import React, { ComponentProps, PropsWithChildren, useEffect, useState } from 'react'
import { useLocation } from '@reach/router'
import styled from 'styled-components'
import { Page } from '../layout/Page'
import DisqusComments from '../components/subcomponents/DisqusComments'
import { AuthorDataProps } from './author-data'
import { BlogPostStructuredData } from '../meta/structuredData/BlogPostStructuredData'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import { ConstrainedWidthContainer } from '../ConstrainedWidthContainer'
import variables from '../styles/variables'
import NewsletterWrapper from '../components/subcomponents/NewsletterWrapper'
import { CustomSection } from '../components/shared'
import { SocialMediaShare } from './SocialMediaShare'
import { allMdxData } from '../models/gql'
import RelatedPosts from './related-posts'
import { PostArticleContent } from './post-article-content'
import { SEO } from '../meta/SEO'

const WrapperNews = styled.div`
  @media ${variables.device.tablet} {
    padding: 0 ${variables.pxToRem(24)};
  }
  @media ${variables.device.mobile} {
    padding: 0 ${variables.pxToRem(18)};
  }
`

export const Head = ({ data }: PostTemplateProps) => {
  const {image, canonicalUrl, title, date, excerpt, tags, author} = data.mdx.frontmatter

  return <SEO
    title={title}
    description={excerpt} type='article'
    image={image}
    canonicalUrl={canonicalUrl}
  >
    <meta property='article:published_time' content={date} />
    <meta property='article:tag' content={tags?.join(', ') ?? ''} />
    <meta property='article:author' content={author} />
  </SEO>
}

export type PostTemplateProps = PropsWithChildren<{
  path: string
  authorsView?: (props: AuthorDataProps) => JSX.Element
  structuredData?: (props: ComponentProps<typeof BlogPostStructuredData>) => JSX.Element
  data: {
    mdx: {
      excerpt: string
      frontmatter: {
        slug: string
        title: string
        description: string
        author: string
        secondAuthor: string
        thirdAuthor: string
        tags?: string[]
        date: string
        meaningfullyUpdatedAt: string
        excerpt: string
        image: FileNode
        canonicalUrl: string
      }
      fileAbsolutePath: string
      internal: {
        contentFilePath: string
      }
      fields: {
        timeToRead: {
          minutes: number
        }
      }
    }
    allMdx: allMdxData
  }
}>

// TODO: we should decouple Post* controls that deal with graphql from those that render actual posts
export const PostTemplate = function PostTemplate(props: PostTemplateProps) {
  const { mdx, allMdx } = props.data // data.mdx holds your post data
  const { frontmatter: page } = mdx
  const { pathname } = useLocation()
  const slug = props.path.replace(/^(\/blog\/)/, '')
  const title = mdx.frontmatter.title

  const postStructuredData = props.structuredData?.({
    authors_id: [page.author, page.secondAuthor, page.thirdAuthor],
    excerpt: page.excerpt,
    path: props.path,
    publishedOn: page.date,
    meaningfullyUpdatedAt: page.meaningfullyUpdatedAt,
    title: page.title,
    image: page.image,
  }) ?? (
    <BlogPostStructuredData
      authors_id={[page.author, page.secondAuthor, page.thirdAuthor]}
      excerpt={page.excerpt}
      path={props.path}
      publishedOn={page.date}
      meaningfullyUpdatedAt={page.meaningfullyUpdatedAt}
      title={page.title}
      image={page.image}
    />
  )
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  const comments = isScrolledDown && <DisqusComments id={slug} title={page.title} />

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10 && !isScrolledDown) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }
    }
    document.addEventListener('scroll', scrollListener)
    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <Page>
      <ConstrainedWidthContainer id='blog'>
        <SocialMediaShare blackIcons slug={pathname} title={title} />
        <PostArticleContent
          title={page.title}
          date={page.date}
          meaningfullyUpdatedAt={page.meaningfullyUpdatedAt}
          authorsView={props.authorsView}
          author={page.author}
          secondAuthor={page.secondAuthor}
          thirdAuthor={page.thirdAuthor}
          canonicalUrl={page.canonicalUrl}
          fileAbsolutePath={mdx.fileAbsolutePath}
          tags={page.tags ?? []}
          timeToRead={Math.round(mdx.fields.timeToRead.minutes)}
          children={props.children}
          contentView={undefined}
        />
      </ConstrainedWidthContainer>
      <CustomSection
        paddingProps='2rem 15rem 7.25rem 15rem'
        paddingLaptop='0rem 6rem 7.25rem'
        paddingTabletXL='0rem 9rem 7.25rem'
        paddingTablet='0rem 2.25rem 2.5rem'
        paddingMobileProps='0 1.125rem 2rem'
      >
        <RelatedPosts allMdx={allMdx} currentPostfileAbsolutPath={mdx.internal.contentFilePath} />
      </CustomSection>
      <ConstrainedWidthContainer id='blog'>
        <WrapperNews>
          <div> {comments} </div>
          <NewsletterWrapper />
        </WrapperNews>
      </ConstrainedWidthContainer>

      {postStructuredData}
    </Page>
  )
}
export default PostTemplate

export const pageQuery = graphql`
  query($id: String!, $relatedTags: [String!]!) {
    mdx(id: { eq: $id }) {
      excerpt
      frontmatter {
        slug
        title
        description
        author
        secondAuthor
        thirdAuthor
        tags
        date
        meaningfullyUpdatedAt
        canonicalUrl
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }

      fields {
        timeToRead {
          minutes
        }
      }
      internal {
        contentFilePath
      }
    }
    allMdx(
      filter: {
        frontmatter: {
          layout: { eq: "post" }
          published: { ne: false }
          hidden: { ne: true }
          tags: { in: $relatedTags }
        }
      }
      sort: { fields: { modifiedAt: DESC } }
      limit: 5
    ) {
      edges {
        node {
          id
          internal {
            contentFilePath
          }
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
