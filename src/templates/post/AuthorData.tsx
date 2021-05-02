import React, { useMemo } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { routeLinks } from '../../config/routing'
import { graphql, useStaticQuery } from 'gatsby'
import { HelmetMetaAuthor } from '../../HelmetMetaAuthor'

interface AuthorDataProps {
  author_id?: string
  avatar?: string
  name?: string
  bio?: string
}

export const AuthorData: React.FC<AuthorDataProps> = ({ author_id }) => {
  const authors = useStaticQuery(graphql`
      {
          allMarkdownRemark(filter: { frontmatter: { author_id: { ne: null } } }) {
              nodes {
                  frontmatter {
                      author_id
                      avatar {
                          childImageSharp {
                              gatsbyImageData(
                                  width: 64
                              )
                          }
                      }
                      bio
                      name
                      web
                  }
              }
          }
      }
  `)
  const { avatar, bio, name, web } = useMemo(() => {
    return authors.allMarkdownRemark.nodes.find(({ frontmatter }: { frontmatter: { author_id: string } }) => {
      return frontmatter.author_id === author_id
    })!.frontmatter
  }, [author_id])
  const LinkComponent = author_id ? 'a' : 'span'

  return (
    <LinkComponent {...(author_id ? { ...{ href: `${routeLinks.aboutUs}/${author_id}` } } : {})}>
      <HelmetMetaAuthor author={name} />
      <article className='media'>
        {avatar && (
          <figure className='media-left'>
            <p className='image is-64x64'>
              <GatsbyImage
                image={getImage(avatar)!}
                alt={name + ' bio photo'}
                className='is-rounded'
              />
            </p>
          </figure>
        )}
        <div className='media-content'>
          <div className='content'>
            <h4 className='title has-text-dark'>{name}</h4>
            <p className='subtitle is-6'>{bio}</p>
          </div>
        </div>
      </article>
    </LinkComponent>
  )
}
