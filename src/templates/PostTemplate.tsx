import { graphql, navigate } from 'gatsby'
import React, { ComponentProps, useEffect, useRef, useState } from 'react'
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
import Newsletter from '../components/subcomponents/Newsletter'
import NewsletterWrapper from './../components/subcomponents/NewsletterWrapper'
import { Button, CustomSection } from '../components/shared'
import { SocialMediaShare } from './blog/SocialMediaShare'
import { clampBuilder } from './../helpers/clampBuilder'
import { ArrowBackOrange } from '../components/icons/ArrowBackOrange.icon'

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
    p strong,
    li,
    .title,
    .subtitle {
      color: ${variables.color.heading};
    }
    h2 {
      font-size: ${variables.pxToRem(40)};
      &:target {
        &:before {
          display: block;
          content: ' ';
          height: 100px;
          margin-top: -100px;
          visibility: hidden;
        }
      }
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(34)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(22)};
      }
    }
    h3 {
      font-size: ${variables.pxToRem(28)};
      &:target {
        &:before {
          display: block;
          content: ' ';
          height: 100px;
          margin-top: -100px;
          visibility: hidden;
        }
      }
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(25)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(18)};
      }
    }
    p,
    li,
    p strong {
      font-size: ${variables.pxToRem(20)};
      font-weight: 400;
      line-height: ${variables.pxToRem(40)};
      letter-spacing: normal;

      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(16)};
        line-height: ${variables.pxToRem(28)};
      }
    }
    p strong {
      font-weight: 700;
    }

    ul li::marker {
      color: ${variables.color.primary};
    }
    p img {
      will-change: transform;
      transition: transform 1.2s cubic-bezier(0.08, 0.635, 0.25, 0.995) 0s;
      &:hover {
        transform: scale(1.1);
      }
    }
    blockquote {
      background: #f5f5f5;
      border: none;
      padding: ${variables.pxToRem(25)} ${variables.pxToRem(60)} ${variables.pxToRem(64)} ${variables.pxToRem(223)};
      position: relative;
      margin: ${variables.pxToRem(105)} 0;
      &:before {
        content: '“';
        color: ${variables.color.primary};
        position: absolute;
        font-family: ${variables.font.title.family};
        font-size: ${clampBuilder(581, 1920, 152, 231)};
        line-height: 1;
        font-weight: 900;
        top: 0;
        left: ${variables.pxToRem(43)};
      }
      & h2 {
        // font: normal normal 800 34px/42px Montserrat;
        font-weight: 800;
        font-size: ${clampBuilder(360, 1920, 24, 34)};
        line-height: ${clampBuilder(360, 1920, 29, 42)};
        margin-bottom: ${clampBuilder(360, 1920, 32, 36)};
      }
      & div {
        font-family: ${variables.font.customtext.lato};
        font-size: ${clampBuilder(360, 1920, 16, 20)};
        line-height: ${variables.pxToRem(40)};
        margin-bottom: ${clampBuilder(360, 1920, 32, 46)};
      }
      & footer {
        font: normal normal bold 16px/19px Lato;
        font-wight: bold;
        font-family: ${variables.font.customtext.lato};
        font-size: ${variables.pxToRem(16)};
        line-height: ${variables.pxToRem(19)};
      }
      @media ${variables.device.laptop} {
        padding: ${variables.pxToRem(28)} ${variables.pxToRem(43)} ${variables.pxToRem(64)} ${variables.pxToRem(203)};
      }
      @media ${variables.device.tablet} {
        padding: ${variables.pxToRem(112)} ${variables.pxToRem(54)} ${variables.pxToRem(64)} ${variables.pxToRem(54)};
      }
      @media ${variables.device.mobile} {
        padding: ${variables.pxToRem(112)} ${variables.pxToRem(7)} ${variables.pxToRem(45)} ${variables.pxToRem(33)};
        &:before {
          left: ${variables.pxToRem(33)};
        }
      }
    }
  }

    && .block-button {
      border: 1px solid ${variables.color.primary};
      padding: ${clampBuilder(360, 1920, 42, 64)} ${clampBuilder(360, 1920, 26, 150)};
      margin: ${clampBuilder(360, 1920, 82, 105)} 0 ${clampBuilder(360, 1920, 82, 186)};
      & h2 {
        // font: normal normal 800 34px/42px Montserrat;
        font-weight: 800;
        font-size: ${clampBuilder(360, 1920, 24, 34)};
        line-height: ${clampBuilder(360, 1920, 29, 42)};
        margin-bottom: ${clampBuilder(360, 1920, 32, 36)};
        text-align: center;
      }
      & div {
        font-family: ${variables.font.customtext.lato};
        font-size: ${clampBuilder(360, 1920, 16, 20)};
        line-height: ${variables.pxToRem(40)};
        margin-bottom: ${clampBuilder(360, 1920, 32, 36)};
      }
      & button {
        border: 1px solid #f7931e;
        background: #f7931e;
        font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 0;
        color: #000000;
        opacity: 1;
        padding: 1rem 4rem;
        font-size: ${clampBuilder(360, 1920, 16, 18)};
        cursor: pointer;
        transition: all 0.3s ease-out;
        display: block;
        margin: 0 auto;
        &:hover {
          color: #ffffff;
          border: 1px solid #000000;
          background: #000000;
        }
        & a {
          color: inherit;
          text-decoration: none;
        }
      }
    }
    && .important-info {
      boimport { ArrowBackOrange } from './../components/icons/ArrowBackOrange.icon';
rder: 1px solid ${variables.color.primary};
      padding: ${clampBuilder(360, 1920, 42, 64)} ${clampBuilder(360, 1920, 26, 150)};
      margin: ${clampBuilder(360, 1920, 82, 105)} 0 ${clampBuilder(360, 1920, 82, 186)};
      & h2 {
      
        font-weight: 800;
        font-size: ${clampBuilder(360, 1920, 24, 34)};
        line-height: ${clampBuilder(360, 1920, 29, 42)};
        margin-bottom: ${clampBuilder(360, 1920, 32, 36)};
        text-align: center;
      }
      & div {
        font-family: ${variables.font.customtext.lato};
        font-size: ${clampBuilder(360, 1920, 16, 20)};
        line-height: ${variables.pxToRem(40)};
        margin-bottom: ${clampBuilder(360, 1920, 32, 36)};
      }
    }
    & .hide-on-mobile {
      display: block
      @media ${variables.device.mobile} {
        display: none;
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
const WrapperNews = styled.div`
  @media ${variables.device.tablet} {
    padding: 0 ${variables.pxToRem(24)};
  }
  @media ${variables.device.mobile} {
    padding: 0 ${variables.pxToRem(18)};
  }
`
const PreviousButton = styled(Button)`
  display: flex;
  align-items: center;
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
              {/* <a
                className='has-text-grey-light'
                href={'/admin/#/collections/blog/entries/' + getFileNameOnly(props.fileAbsolutePath)}
              >
                Edit
              </a> */}
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

      <PreviousButton onClick={() => navigate(-1)}>
        <ArrowBackOrange />
        Previous
      </PreviousButton>

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
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  const comments = props.commentsView?.() ?? (isScrolledDown && <DisqusComments id={slug} title={page.title} />)

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

      <ConstrainedWidthContainer id='blog'>
        <SocialMediaShare blackIcons slug={pathname} title={title} />
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
