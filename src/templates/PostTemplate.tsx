import { graphql, Link } from 'gatsby'
import React, { ComponentProps, ReactElement } from 'react'
import { useLocation } from '@reach/router'
import styled from 'styled-components'
import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import DateFormatter from '../components/subcomponents/Date'
import DisqusComments from '../components/subcomponents/DisqusComments'
import { AuthorData, AuthorDataProps } from './post/AuthorData'
import { getFileNameOnly } from '../helpers/pathHelpers'
import { routeLinks } from '../config/routing'
import { BlogPostStructuredData } from '../BlogPostStructuredData'
import { getSrc } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import Helmet from 'react-helmet'
import { descriptionOrDefault } from '../meta/meta-description'
import { resolveUrl } from '../meta/resolve-url'
import { siteMetadata } from '../../gatsby-config'
import { ConstrainedWidthContainer } from '../ConstrainedWidthContainer'
import { PostTags } from '../PostTags'
import variables from '../styles/variables'

const AuthorsSection = styled.article`
  padding: 3rem 1.5rem;
  & .author-container {
    padding-top: 2rem;
  }
  && .content {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    li,
    .title,
    .subtitle {
      color: ${variables.color.heading};
    }
    h2 {
      font-size: ${variables.pxToRem(40)};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(34)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(22)};
      }
    }
    h3 {
      font-size: ${variables.pxToRem(28)};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(25)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(18)};
      }
    }
    p,
    li {
      font-size: ${variables.pxToRem(20)};
      font-weight: 400;

      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(16)};
      }
    }
  }
  & .author-container > div:not(:last-of-type) {
    margin-right: 1.3125rem;
    @media ${variables.device.mobile} {
      margin-right: 1.125rem;
    }
  }
  @media ${variables.device.mobile} {
    padding: 0 1.125rem;
  }
`

const Title = styled.h1`
  font-size: ${variables.pxToRem(54)};
  color: ${variables.color.heading};
  font-weight: 900;
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(44)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(38)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(32)};
    font-weight: 700;
  }
`

const Content = styled.div`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  letter-spacing: 1;
  line-height: 2;
`

export type PostTemplateProps = {
  path: string
  authorsView?: (props: AuthorDataProps) => JSX.Element
  structuredData?: (props: ComponentProps<typeof BlogPostStructuredData>) => JSX.Element
  contentView?: () => JSX.Element
  commentsView?: () => JSX.Element
  data: {
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        slug: string
        title: string
        description: string
        author: string
        secondAuthor: string
        thirdAuthor: string
        tags: string[]
        date: string
        excerpt: string
        image: FileNode
        canonicalUrl: string
      }
      timeToRead: number
      fileAbsolutePath: string
    }
  }
}

type TimeInMinutes = number

type PostAuthorsProps = {
  secondAuthor?: string
  author: string
  thirdAuthor?: string
  authorsView?: (props: AuthorDataProps) => JSX.Element
}
type PostContentProps = { contentView: () => JSX.Element } | { html: string; contentView: undefined }

type PostArticleContentProps = PostAuthorsProps &
  PostContentProps & {
    title: string

    timeToRead: TimeInMinutes

    tags: string[]
    date?: string

    fileAbsolutePath: string
    canonicalUrl: string
  }

export const PostArticleContent = (props: PostArticleContentProps) => {
  const authors = props.authorsView?.({ authorId: props.author }) ?? (
    <AuthorData authorId={props.author} isSingleAuthor={!props.secondAuthor && !props.thirdAuthor} />
  )
  const secondAuthorView = props.secondAuthor
    ? props.authorsView?.({ authorId: props.secondAuthor }) ?? <AuthorData authorId={props.secondAuthor} />
    : null
  const thirdAuthorView = props.thirdAuthor
    ? props.authorsView?.({ authorId: props.thirdAuthor }) ?? <AuthorData authorId={props.thirdAuthor} />
    : null
  return (
    <AuthorsSection>
      <div className='columns is-vcentered'>
        <div className='is-flex author-container'>
          <div>{authors}</div>
          <div>{secondAuthorView && secondAuthorView}</div>
          <div>{thirdAuthorView && thirdAuthorView}</div>
        </div>

        <div className='column has-text-right'>
          <div className='content has-text-grey-light'>
            <p className='has-text-primary'>{props.timeToRead} min</p>
            <PostTags tags={props.tags} />

            <p>
              {props.date && <DateFormatter date={props.date} />}
              &nbsp;
              <a
                className='has-text-grey-light'
                href={'/admin/#/collections/blog/entries/' + getFileNameOnly(props.fileAbsolutePath)}
              >
                Edit
              </a>
            </p>
          </div>
        </div>
      </div>

      <Title>{props.title}</Title>
      {props.contentView ? (
        <Content className='content is-family-secondary'>{props.contentView()}</Content>
      ) : (
        <Content className='content is-family-secondary' dangerouslySetInnerHTML={{ __html: props.html }} />
      )}

      <BackButton url={routeLinks.blog} label='Blog' />

      {props.canonicalUrl && (
        <section>
          <a href={props.canonicalUrl} style={{ fontStyle: 'italic' }}>
            This article was originally published on author's blog
          </a>
        </section>
      )}
    </AuthorsSection>
  )
}

// TODO: we should decouple Post* controls that deal with graphql from those that render actual posts
export const PostTemplate = function PostTemplate(props: PostTemplateProps) {
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter: page, html } = markdownRemark
  const { pathname } = useLocation()
  const slug = props.path.replace(/^(\/blog\/)/, '')
  const title = markdownRemark.frontmatter.title
  const image = markdownRemark.frontmatter.image
  const canonicalUrl = markdownRemark.frontmatter.canonicalUrl

  const postStructuredData = props.structuredData?.({
    author_id: page.author,
    excerpt: page.excerpt,
    path: props.path,
    publishedOn: page.date,
    title: page.title,
    image: page.image,
  }) ?? (
    <BlogPostStructuredData
      author_id={page.author}
      excerpt={page.excerpt}
      path={props.path}
      publishedOn={page.date}
      title={page.title}
      image={page.image}
    />
  )

  const comments = props.commentsView?.() ?? <DisqusComments id={slug} title={page.title} />

  return (
    <Page>
      <Helmet>
        <title>{title} | Bright Inventions</title>
        {title && <meta property='og:title' content={title} />}
        <meta name='description' content={descriptionOrDefault(markdownRemark.excerpt)} />
        <meta property='og:description' content={descriptionOrDefault(markdownRemark.excerpt)} />
        <meta property='og:site_name' content={siteMetadata.title} />
        <meta property='og:url' content={resolveUrl(pathname)} />
        <meta property='og:type' content='article' />
        <meta property='article:published_time' content={markdownRemark.frontmatter.date} />
        {image && <meta property='og:image' content={resolveUrl(getSrc(image)!)} />}
        {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}
      </Helmet>

      <ConstrainedWidthContainer className='container'>
        <PostArticleContent
          title={page.title}
          date={page.date}
          contentView={props.contentView}
          html={markdownRemark.html}
          authorsView={props.authorsView}
          author={page.author}
          secondAuthor={page.secondAuthor}
          thirdAuthor={page.thirdAuthor}
          canonicalUrl={page.canonicalUrl}
          fileAbsolutePath={markdownRemark.fileAbsolutePath}
          tags={page.tags ?? []}
          timeToRead={markdownRemark.timeToRead}
        />

        {comments}
      </ConstrainedWidthContainer>
      {postStructuredData}
    </Page>
  )
}
export default PostTemplate

export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
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
        canonicalUrl
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      timeToRead
      fileAbsolutePath
    }
  }
`
