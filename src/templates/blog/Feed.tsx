import React from 'react'
import formatDate from 'date-fns/format'

import { deleteTimestampFromUrl } from '../../helpers/pathHelpers'
import { BlogPostModel } from '../../models/gql'

import * as styles from './Feed.module.scss'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'

const BlogPostDummyUrl = '/images/dummy/blog_post.png'

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
  const redirect = () => {
    window.location.href = deleteTimestampFromUrl(post.slug)
  }
  return (
    <div className={styles.entry} onClick={redirect}>
      <div className={styles.image}>
        <GatsbyImage
          image={getImage(post.image)}
          alt={post.title}
          className='post-img'
          imgStyle={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.postInfo}>
          <div className={styles.date}>{formatDate(new Date(post.date), 'MMM, d yyyy')}</div>
          <div className={styles.tags}>{post.tags.join(', ')}</div>
        </div>
        <div className={styles.title}>{post.title}</div>
      </div>
    </div>
  )
}
