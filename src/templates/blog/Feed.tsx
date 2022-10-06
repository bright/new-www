import React from 'react'
import formatDate from 'date-fns/format'

import { deleteTimestampFromUrl } from '../../helpers/pathHelpers'
import { BlogPostModel } from '../../models/gql'

import * as styles from './Feed.module.scss'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { Link } from 'gatsby'

const BlogPostDummyUrl = '/images/dummy/blog_post.png'

const ImageWrapper = styled.div`
  .post-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
interface Props {
  posts: BlogPostModel[]
  numToSliced?: Number
}

export const BlogFeed = ({ posts, numToSliced }: Props) => {
  return (
    <div className={styles.feed}>
      {posts.map((post, index) => {
        if (numToSliced) {
          if (index < numToSliced) {
            return <Post key={post.id} post={post} />
          } else {
            return <></>
          }
        } else {
          return <Post key={post.id} post={post} />
        }
      })}
    </div>
  )
}

const Post: React.FC<{ post: BlogPostModel }> = ({ post }) => {
  return (
    <div className={styles.entry}>
      <Link to={deleteTimestampFromUrl(post.slug)}>
        <ImageWrapper className={styles.image}>
          <GatsbyImage
            image={getImage(post.image)!}
            alt={post.title}
            className='post-img'
            imgStyle={{ objectFit: 'cover' }}
          />
        </ImageWrapper>
        <div className={styles.content}>
          <div className={styles.postInfo}>
            <div className={styles.date}>
              {post.dateModified
                ? formatDate(
                    new Date(
                      post.dateModified
                        .replace(/-/g, '/')
                        .replace('T', ' ')
                        .replace(/\..*|\+.*/, '')
                    ),
                    'MMM dd, yyyy'
                  )
                : formatDate(
                    new Date(
                      post.date
                        .replace(/-/g, '/')
                        .replace('T', ' ')
                        .replace(/\..*|\+.*/, '')
                    ),
                    'MMM dd, yyyy'
                  )}
            </div>
            <div className={styles.tags}>{post.tags.join(', ')}</div>
          </div>
          <div className={styles.title}>{post.title}</div>
        </div>
      </Link>
    </div>
  )
}
