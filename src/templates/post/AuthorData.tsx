import React, { ReactNode, useMemo, useState } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { routeLinks } from '../../config/routing'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { HelmetMetaAuthor } from '../../HelmetMetaAuthor'
import { useAuthors } from '../../use-authors/use-authors'
import styled from 'styled-components'
import variables from '../../styles/variables'

const AuthorArticle = styled.article`
  position: relative;
  width: inherit;
  transition: all 0.3s;
  &:hover > .media-content {
    opacity: 1;
  }

  & figure {
    & .is-rounded {
      height: 87px;
      width: 87px;
      overflow: hidden;
      transition: all 0.3s;
      & .image {
        border-radius: 180px;
        border: 1px solid #d3d3d3;
        & :hover {
          border: 1px solid #f7931e;
        }
      }

      @media ${variables.device.mobile} {
        height: 51px;
        width: 51px;
      }
    }
  }

  & .media-content {
    position: absolute;
    top: -80px;
    left: 0;
    width: max-content;
    background-color: #131214d3;
    border: 1px solid #707070;
    opacity: 0;
    @media ${variables.device.mobile} {
      display: none;
    }
    .content {
      padding: 0.75rem 1.1875rem;
      .name {
        font-size: 1rem;
        color: #fff;
        line-height: 1.5rem;
        margin: 0;
      }
      .subtitle {
        font-size: 1rem;
        color: #fff;
      }
    }
  }
`

export interface AuthorDataProps {
  authorId?: string
}

export function AuthorsView({
  authorId,
  slug,
  name,
  avatar,
  bio,
}: {
  authorId: string | undefined
  slug: string | undefined
  name: string
  avatar: IGatsbyImageData
  bio: string
}) {
  const LinkComponent = authorId
    ? (props: { children?: ReactNode }) => <Link to={routeLinks.aboutUs({ authorId, slug })}>{props.children}</Link>
    : (props: { children?: ReactNode }) => <span>{props.children}</span>

  return (
    <LinkComponent>
      <HelmetMetaAuthor author={name} />
      <AuthorArticle>
        <div className='media-content'>
          <div className='content'>
            <h4 className='name'>{name}</h4>
            <p className='subtitle is-6 bio'>{bio}</p>
          </div>
        </div>

        {avatar && (
          <figure className=''>
            <p className='image is-87x87'>
              <GatsbyImage
                image={getImage(avatar)!}
                alt={name + ' bio photo'}
                className='is-rounded'
                imgClassName='image'
              />
            </p>
          </figure>
        )}
      </AuthorArticle>
    </LinkComponent>
  )
}

export const AuthorData: React.FC<AuthorDataProps> = ({ authorId }) => {
  const [{ avatar, name, bio, slug }] = authorId ? useAuthors({ authorId, avatarSize: { width: 64 } }) : []
  return AuthorsView({ authorId: authorId, slug: slug, name: name, avatar: avatar, bio: bio })
}
