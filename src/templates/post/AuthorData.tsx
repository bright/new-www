import React, { ReactNode, useMemo } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { routeLinks } from '../../config/routing'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { HelmetMetaAuthor } from '../../HelmetMetaAuthor'
import { useAuthors } from '../../use-authors/use-authors'

export interface AuthorDataProps {
  authorId?: string
}

export function AuthorsView(
  {
    authorId,
    slug,
    name,
    avatar,
    bio
  }: { authorId: string | undefined, slug: string | undefined, name: string, avatar: IGatsbyImageData, bio: string }
) {
  const LinkComponent = authorId
    ? (props: { children?: ReactNode }) => <Link to={routeLinks.aboutUs({ authorId, slug })}>{props.children}</Link>
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

export const AuthorData: React.FC<AuthorDataProps> = ({ authorId }) => {
  const [{ avatar, name, bio, slug }] = authorId ? useAuthors({ authorId, avatarSize: { width: 64 } }) : []
  return AuthorsView({ authorId: authorId, slug: slug, name: name, avatar: avatar, bio: bio })
}
