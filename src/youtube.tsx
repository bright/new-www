import YouTube, { YouTubeProps } from 'react-youtube'
import React from 'react'

import * as styles from './youtube.module.scss'

export const YouTubeWrapper = (props: YouTubeProps) => {
  props = {
    opts: {
      width: '100%',
      height: '100%'
    },
    ...props
  }
  return <YouTube className={styles.youtubeInMdx} iframeClassName={styles.youtubeIframeInMdx}  {...props} />
}
