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
  
  .title {
    font-size: 1.25em;
  }

  & figure {
    & .is-rounded {
      height: 87px;
      width: 87px;
      overflow: hidden;
      transition: all 0.3s;
      @media ${variables.device.mobile} {
        height: 51px;
        width: 51px;
      }
      & .image {
        border-radius: 180px;
        border: 1px solid #d3d3d3;
        max-height: 87px;
        object-position: 50% 15%;
        @media ${variables.device.mobile} {
          max-height: 51px;
        }
        & :hover {
          border: 1px solid #f7931e;
        }
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
      & p.subtitle {
        font-size: 1rem;
        color: #fff;
      }
    }
  }
`
const SingleAuthorArticle = styled.article`
  .title {
    font-size: 1.25em;
  }
  & .single-image {
    width: 64px;
    height: 96px;
  }
  & .media-content {
    align-self: flex-end;
  }
`

export interface AuthorDataProps {
  authorId?: string
  isSingleAuthor?: boolean
}

export function AuthorsView({
  authorId,
  slug,
  name,
  avatar,
  isSingleAuthor,
  bio,
}: {
  authorId: string | undefined
  slug: string | undefined
  name: string
  isSingleAuthor: boolean | undefined
  avatar: IGatsbyImageData
  bio: string
}) {
  const LinkComponent = authorId
    ? (props: { children?: ReactNode }) => <Link to={routeLinks.aboutUs({ authorId, slug })}>{props.children}</Link>
    : (props: { children?: ReactNode }) => <span>{props.children}</span>
  return (
    <LinkComponent>
      <HelmetMetaAuthor author={name} />
      {isSingleAuthor ? (
        <SingleAuthorArticle className='media'>
          {avatar && (
            <figure className='media-left'>
              <p className='single-image'>
                <GatsbyImage image={getImage(avatar)!} alt={name + ' bio photo'} className='is-rounded' />
              </p>
            </figure>
          )}
          <div className='media-content'>
            <div className='content'>
              <div className='title'>{name}</div>
              <p className='subtitle is-6'>{bio}</p>
            </div>
          </div>
        </SingleAuthorArticle>
      ) : (
        <AuthorArticle>
          <div className='media-content'>
            <div className='content'>
              <div className='name'>{name}</div>
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
      )}
    </LinkComponent>
  )
}

export const AuthorData: React.FC<AuthorDataProps> = ({ authorId, isSingleAuthor }) => {
  const [{ avatar, name, bio, slug }] = authorId ? useAuthors({ authorId, avatarSize: { width: 120 } }) : []
  return AuthorsView({
    authorId: authorId,
    slug: slug,
    name: name,
    avatar: avatar,
    bio: bio,
    isSingleAuthor: isSingleAuthor,
  })
}
