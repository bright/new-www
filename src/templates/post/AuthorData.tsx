import React from 'react'
import { routeLinks } from '../../config/routing'

interface AuthorDataProps {
  author_id?: string
  avatar?: string
  name?: string
  bio?: string
}

export const AuthorData: React.FC<AuthorDataProps> = ({author_id, avatar, name, bio}) => {
  const LinkComponent = author_id ? 'a' : 'span'

  return (
    <LinkComponent {...(author_id ? { ...{ href: `${routeLinks.aboutUs}/${author_id}` } } : {})}>
      <article className="media">
        {avatar && (
          <figure className="media-left">
            <p className="image is-64x64">
              <img
                src={avatar}
                alt={name + ' bio photo'}
                className="is-rounded"
              />
            </p>
          </figure>
        )}
        <div className="media-content">
          <div className="content">
            <h4 className="title has-text-dark">{name}</h4>
            <p className="subtitle is-6">{bio}</p>
          </div>
        </div>
      </article>
    </LinkComponent>
  )
}
