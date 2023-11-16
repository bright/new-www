import { YouTubeEmbed, YouTubeEmbedProps } from 'react-social-media-embed/dist/components/embeds/YouTubeEmbed'
import React from 'react'

export const BrightYouTubeEmbed = (props: YouTubeEmbedProps) => {
  const youTubeProps = { style: { aspectRatio: '16/9' } }
  props = {
    width: '100%',
    height: '100%',
    youTubeProps,
    ...props
  }
  return <YouTubeEmbed {...props} />
}
