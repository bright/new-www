import { graphql } from 'gatsby'
import React from 'react'
import { useLocation } from '@reach/router'
import styled from 'styled-components'
import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import DateFormatter from '../components/subcomponents/Date'
import DisqusComments from '../components/subcomponents/DisqusComments'
import { AuthorData } from './post/AuthorData'
import { getFileNameOnly } from '../helpers/pathHelpers'
import { routeLinks } from '../config/routing'
import { BlogPostStructuredData } from '../BlogPostStructuredData'
import { getSrc, IGatsbyImageData } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import Helmet from 'react-helmet'
import { descriptionOrDefault } from '../meta/meta-description'
import { resolveUrl } from '../meta/resolve-url'
import { siteMetadata } from '../../gatsby-config'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { ConstrainedWidthContainer } from '../ConstrainedWidthContainer'

const Title = styled.h1`
  font-size: 3rem;
`

const Content = styled.div`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  letter-spacing: 1;
  line-height: 2;
`

export default function Template(props: {
  path: string
  data: {
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        slug: string
        title: string
        description: string
        author: string
        tags: string[]
        date: string
        excerpt: string
        image: FileNode
        canonicalUrl: string
      }
      timeToRead: number
      fileAbsolutePath: string
    }
    allMarkdownRemark: {
      nodes: Array<{
        frontmatter: {
          author_id: string
          avatar: string
          bio: string
          name: string
          web: string
        }
      }>
    }
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
  }
}) {
  const { markdownRemark, allMarkdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter: page, html } = markdownRemark
  const { pathname } = useLocation()
  const slug = props.path.replace(/^(\/blog\/)/, '')
  const title = markdownRemark.frontmatter.title
  const image = markdownRemark.frontmatter.image
  const canonicalUrl = markdownRemark.frontmatter.canonicalUrl
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
        <article className='section'>
          <div className='columns is-vcentered'>
            <div className='column is-half'>
              <AuthorData authorId={page.author} />
            </div>
            <div className='column has-text-right'>
              <div className='content has-text-grey-light'>
                <p className='has-text-primary'>{markdownRemark.timeToRead} min</p>
                <p className='tags has-justify-content-flex-end'>
                  {page.tags.map((tag, index) => (
                    <span className='tag' key={'tag-' + index}>
                      {tag}
                    </span>
                  ))}
                </p>

                <p>
                  {page.date && <DateFormatter date={page.date} />}
                  &nbsp;
                  <a
                    className='has-text-grey-light'
                    href={'/admin/#/collections/blog/entries/' + getFileNameOnly(markdownRemark.fileAbsolutePath)}
                  >
                    Edit
                  </a>
                </p>
                {/* <p>{% include post/date.html date=page.date updated=page.updated %}</p>  */}
              </div>
            </div>
          </div>

          <Title className='title'>{page.title}</Title>
          <Content className='content is-family-secondary' dangerouslySetInnerHTML={{ __html: html }} />

          <BackButton url={routeLinks.blog} label='Blog' />

          {canonicalUrl && (
            <section>
              <OutboundLink href={canonicalUrl} style={{ fontStyle: 'italic' }}>
                This article was originally published on author's blog
              </OutboundLink>
            </section>
          )}

          <DisqusComments id={slug} title={page.title} />
        </article>
      </ConstrainedWidthContainer>
      <BlogPostStructuredData
        author_id={page.author}
        excerpt={page.excerpt}
        path={props.path}
        publishedOn={page.date}
        title={page.title}
        image={page.image}
      />
    </Page>
  )
}

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

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
