import React from 'react'
import formatDate from 'date-fns/format'

import {deleteTimestampFromUrl} from '../../helpers/pathHelpers'
import {BlogPostModel} from '../../models/gql'

import styles from './Feed.module.scss'

interface Props {
    posts: BlogPostModel[]
}

export const BlogFeed = ({posts}: Props) => {
    return (
        <div className={styles.feed}>
            {posts.map(post => <Post key={post.id} post={post} />)}
        </div>
    )
}

const Post: React.FC<{post: BlogPostModel}> = ({post}) => {
    const redirect = () => {
        window.location.href = deleteTimestampFromUrl(post.slug)
    }

    return (
        <div className={styles.entry} onClick={redirect}>
            <div className={styles.image}><img src={post.image} alt={post.title}/></div>
            <div className={styles.content}>
                <div className={styles.postInfo}>
                    <div className={styles.date}>{formatDate(new Date(post.date), 'MMM, d yyyy')}</div>
                    <div className={styles.tags}>
                        {post.tags.join(', ')}
                    </div>
                </div>
                <div className={styles.title}>
                    {post.title}
                </div>
            </div>
        </div>
    )
}