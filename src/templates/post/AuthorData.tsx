import React, { ReactNode, useMemo } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { routeLinks } from '../../config/routing'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { HelmetMetaAuthor } from '../../HelmetMetaAuthor'
import { useAuthors } from '../../use-authors/use-authors'

interface AuthorDataProps {
  authorId?: string
}

export const AuthorData: React.FC<AuthorDataProps> = ({ authorId }) => {
  const [{ avatar, name, bio }] = authorId ? useAuthors({ authorId, avatarSize: { width: 64 } }) : []

  const LinkComponent = authorId
    ? (props: { children?: ReactNode }) => <Link to={`${routeLinks.aboutUs}/${authorId}`}>{props.children}</Link>
    : (props: { children?: ReactNode }) => <span>{props.children}</span>

  return (
    <LinkComponent>
      <HelmetMetaAuthor author={name} />
      <article className='media'>
        {avatar && (
          <figure className='media-left'>
            <p className='image is-64x64'>
              <GatsbyImage image={getImage(avatar)!} alt={name + ' bio photo'} className='is-rounded' />
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
