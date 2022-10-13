import { graphql, useStaticQuery } from 'gatsby'
import { BlogPosting, Organization, Person, WithContext } from 'schema-dts'
import { StructuredData } from './StructuredData'
import React, { useMemo } from 'react'
import { getSrc, IGatsbyImageData } from 'gatsby-plugin-image'
import { FileNode, ImageDataLike } from 'gatsby-plugin-image/dist/src/components/hooks'

export const BlogPostStructuredData = (props: {
  authors_id: string[]
  path: string
  excerpt: string
  publishedOn: string
  dateModified: string
  image: FileNode
  title: string
}) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
    allMarkdownRemark: { nodes: authors },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark(filter: { frontmatter: { author_id: { ne: null } } }) {
        nodes {
          frontmatter {
            author_id
            avatar {
              childImageSharp {
                gatsbyImageData
              }
            }
            bio
            name
            slug
          }
        }
      }
    }
  `)

  const postAuthors = useMemo(() => {
    return authors.filter(({ frontmatter }: { frontmatter: { author_id: string } }) => {
      return props.authors_id.includes(frontmatter.author_id)
    })
  }, [props.authors_id])

  const BrightInventionsOrganization: Organization = {
    '@type': 'Organization',
    url: siteUrl,
    name: 'Bright Inventions',
    logo: siteUrl + '/images/b_logo_black.svg',
  }

  const authorsData = postAuthors.map(
    ({
      frontmatter,
    }: {
      frontmatter: { slug: string; email: string; bio: string; name: string; avatar: ImageDataLike }
    }) => {
      const { slug, email, bio, avatar } = frontmatter
      return {
        '@type': 'Person',
        url: siteUrl + `/about-us/${slug}`,
        email: email,
        description: bio,
        name: name,
        image: siteUrl + getSrc(avatar),
      }
    }
  )

  const contextProps: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    url: siteUrl + props.path,
    '@type': 'BlogPosting',
    headline: props.title,
    image: siteUrl + getSrc(props.image),
    datePublished: props.publishedOn,
    dateModified: props.dateModified,
    publisher: BrightInventionsOrganization,
    author: authorsData,
    abstract: props.excerpt,
  }

  return <StructuredData {...contextProps} />
}
