import { AuthorData, AuthorDataProps } from './author-data'
import { isSameDay } from 'date-fns'
import { toDate } from '../to-date'
import { Button, FlexWrapper } from '../components/shared'
import { PostTags } from '../PostTags'
import Dot from '../components/icons/Dot.icon'
import DateFormatter from '../components/subcomponents/Date'
import { navigate } from 'gatsby'
import { ArrowBackOrange } from '../components/icons/ArrowBackOrange.icon'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import variables, { font } from '../styles/variables'
import { clampBuilder } from '../helpers/clampBuilder'

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
    .subtitle,
    strong {
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
    & .hide-on-mobile {
      display: block;
      @media ${variables.device.mobile} {
        display: none;
      }
    }

    ul li::marker {
      color: ${variables.color.primary};
    }
    & .gatsby-resp-image-wrapper,
    .gatsby-resp-image-image,
    span img,
    p img {
      will-change: transform;
      transition: transform .9s cubic-bezier(0.08, 0.635, 0.25, 0.995) 0s;
      &:hover {
        transform: scale(1.02);
      }
    }
    blockquote {
      background: #f5f5f5;
      border: none;
      padding: ${variables.pxToRem(25)} ${variables.pxToRem(60)} ${variables.pxToRem(64)} ${variables.pxToRem(223)};
      position: relative;
      margin: ${variables.pxToRem(46)} 0 ${variables.pxToRem(23)};
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
        font-size: 1.25rem;
        margin-bottom: ${clampBuilder(360, 1920, 32, 36)};
      }
      & div {
        font-family: ${variables.font.customtext.lato};
        font-size: 1.25rem;
      }
      & footer {
        margin-top: ${clampBuilder(360, 1920, 32, 46)};
        font: normal normal bold 16px/19px ${font.lato};
        font-weight: bold;
        font-family: ${variables.font.customtext.lato};
        font-size: 1.25rem;
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
    @media ${variables.device.laptop} {
      margin: ${variables.pxToRem(39)} 0 ${variables.pxToRem(19.5)};
    }
  }

  & .block-button {
    border: 1px solid ${variables.color.primary};
    padding: ${clampBuilder(360, 1920, 42, 64)} ${clampBuilder(360, 1920, 26, 150)};
    margin: ${variables.pxToRem(46)} 0 ${variables.pxToRem(23)};
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
    @media ${variables.device.laptop} {
      margin: ${variables.pxToRem(39)} 0 ${variables.pxToRem(19.5)};
    }
  }
  & .important-info {
    border: 1px solid ${variables.color.primary};
    padding: ${clampBuilder(360, 1920, 42, 64)} ${clampBuilder(360, 1920, 26, 150)};
    margin: ${variables.pxToRem(46)} 0 ${variables.pxToRem(23)};
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
    }
    @media ${variables.device.laptop} {
      margin: ${variables.pxToRem(39)} 0 ${variables.pxToRem(19.5)};
    }
  }

  & .author-container > div:not(:last-of-type) {
    margin-right: 1.3125rem;
    @media ${variables.device.mobile} {
      margin-right: 1.125rem;
    }
    @media ${variables.device.mobile} {
      padding: ${variables.pxToRem(26)} 1.125rem 0;
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
  font-family: ${font.lato};
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 2;

  & .image {
    overflow: hidden;
  }
`
const PreviousButton = styled(Button)`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;
`
const WrapperDot = styled.div`
  position: relative;
  height: 100%;
  width: 4px;

  @media ${variables.device.mobile} {
    margin-bottom: ${variables.pxToRem(4)};
    margin-top: ${variables.pxToRem(0)};
  }
`
const TimeToRead = styled.p`
  font-family: ${font.lato};
  font-style: normal;
  font-weight: bold;
  font-size: ${variables.pxToRem(18)};
  line-height: ${variables.pxToRem(24)};
  color: ${variables.color.primary};
  white-space: nowrap;
`
const Date = styled.p`
  font-family: ${font.lato};
  font-style: normal;
  font-weight: normal;
  font-size: ${variables.pxToRem(20)};
  line-height: ${variables.pxToRem(24)};
  color: ${variables.color.text2};
  white-space: nowrap;
`
const DateUpdateDescription = styled(Date)`
  font-style: italic;
`
const DateModified = styled(Date)`
  font-style: italic;
`
const AuthorsWrapper = styled.div`
  padding-bottom: ${variables.pxToRem(30)};
  @media ${variables.device.laptop} {
    padding-bottom: ${variables.pxToRem(28)};
  }
  @media ${variables.device.tabletXL} {
    padding-bottom: ${variables.pxToRem(24)};
  }
  @media ${variables.device.tablet} {
    padding-bottom: ${variables.pxToRem(28)};
  }
  @media ${variables.device.mobile} {
    padding-bottom: ${variables.pxToRem(40)};
  }
`
type TimeInMinutes = number
type PostAuthorsProps = {
  secondAuthor?: string
  author: string
  thirdAuthor?: string
  authorsView?: (props: AuthorDataProps) => JSX.Element
}
type PostContentProps = { contentView: () => JSX.Element } | PropsWithChildren<{ contentView: undefined }>
type PostArticleContentProps = PostAuthorsProps &
  PostContentProps & {
    title: string

    timeToRead: TimeInMinutes

    tags: string[]
    date: string
    meaningfullyUpdatedAt?: string
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
  const showUpdatedAt =
    props.meaningfullyUpdatedAt && !isSameDay(toDate(props.meaningfullyUpdatedAt)!, toDate(props.date)!)
  return (
    <AuthorsSection>
      <AuthorsWrapper>
        <FlexWrapper
          mobileDirection='column'
          mobileContent='center'
          mobileItems='center'
          desktopContent='space-between'
          mobileGap='25px'
        >
          <FlexWrapper desktopGap={secondAuthorView || thirdAuthorView ? '21px' : 'unset'} tabletBasis='70%'>
            <div>{authors}</div>
            {secondAuthorView && <div>{secondAuthorView}</div>}
            {thirdAuthorView && <div>{thirdAuthorView}</div>}
          </FlexWrapper>

          <FlexWrapper desktopDirection='column' mobileGap='13px' desktopContent='space-between'>
            <PostTags tags={props.tags} />
            <FlexWrapper desktopContent='flex-end' desktopGap='10px' mobileContent='center' desktopItems='center'>
              <TimeToRead>{props.timeToRead} min</TimeToRead>
              <WrapperDot>
                <Dot />
              </WrapperDot>

              <Date>
                <DateFormatter date={props.date} />
              </Date>
            </FlexWrapper>
            {showUpdatedAt && (
              <FlexWrapper desktopContent='flex-end' desktopGap='10px' mobileContent='center'>
                <DateUpdateDescription>Updated </DateUpdateDescription>
                <DateModified>
                  {props.meaningfullyUpdatedAt && <DateFormatter date={props.meaningfullyUpdatedAt} />}
                </DateModified>
              </FlexWrapper>
            )}
          </FlexWrapper>
        </FlexWrapper>
      </AuthorsWrapper>

      <Title>{props.title}</Title>
      {props.contentView ? (
        <Content className='content is-family-secondary'>{props.contentView()}</Content>
      ) : (
        <Content className='content is-family-secondary'>{props.children}</Content>
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
