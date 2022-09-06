import React, { ReactNode, useMemo, useState } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { routeLinks } from '../../config/routing'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { HelmetMetaAuthor } from '../../HelmetMetaAuthor'
import { useAuthors } from '../../use-authors/use-authors'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { FlexWrapper } from './../../components/shared/index.styled'

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
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 1.25em;
  }

  & .media-content {
    align-self: flex-end;
    & .content {
      & .title {
        font-size: ${variables.pxToRem(26)};
        line-height: ${variables.pxToRem(40)};
        font-family: ${variables.font.customtitle.monserat};
        font-weight: bold;
        margin-bottom: 0;
      }
      & .subtitle {
        font-size: ${variables.pxToRem(20)};
        line-height: ${variables.pxToRem(40)};
        font-family: ${variables.font.customtitle.lato};
        font-weight: normal;
      }
    }
  }
  @media ${variables.device.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: centert;
    flex-basis: 100%;
    gap: ${variables.pxToRem(19)};
  }
`
const Figure = styled.figure`
  margin-right: 20px;
  height: 87px;
  width: 87px;
  overflow: hidden;
  transition: all 0.3s;

  & .image {
    border-radius: 180px;
    border: 1px solid #d3d3d3;
    max-height: 87px;
    object-position: 50% 15%;
    @media ${variables.device.tablet} {
      max-height: 77px;
    }
    &:hover {
      border: 1px solid #f7931e;
    }
  }

  @media ${variables.device.tablet} {
    height: 77px;
    width: 77px;
    margin: 0 auto;
  }
`
const Name = styled.div`
  font-size: ${variables.pxToRem(26)};
  line-height: ${variables.pxToRem(40)};
  font-weight: bold;
  color: ${variables.color.text} @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(25)};
  }
`
const Bio = styled.p`
  font-size: ${variables.pxToRem(18)};
  line-height: ${variables.pxToRem(40)};
  font-weight: normal;
  font-family: ${variables.font.customtext.lato};
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
    ? (props: { children?: ReactNode }) => (
        <Link to={routeLinks.aboutUs({ authorId, slug })} style={{ color: 'inherit' }}>
          {props.children}
        </Link>
      )
    : (props: { children?: ReactNode }) => <span>{props.children}</span>
  return (
    <LinkComponent>
      <HelmetMetaAuthor author={name} />
      {isSingleAuthor ? (
        <SingleAuthorArticle>
          {avatar && (
            <Figure>
              <GatsbyImage
                image={getImage(avatar)!}
                alt={name + ' bio photo'}
                className='is-rounded'
                imgClassName='image'
              />
            </Figure>
          )}

          <FlexWrapper desktopDirection='column' mobileContent='center' mobileItems='center' mobileGap='8px'>
            <Name>{name}</Name>
            <Bio>{bio}</Bio>
          </FlexWrapper>
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
            <Figure className=''>
              <GatsbyImage
                image={getImage(avatar)!}
                alt={name + ' bio photo'}
                className='is-rounded'
                imgClassName='image'
              />
            </Figure>
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
