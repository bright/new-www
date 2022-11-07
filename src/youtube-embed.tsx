import { YouTubeEmbedProps } from 'react-social-media-embed/dist/components/embeds/YouTubeEmbed'
import { YouTubeEmbed } from 'react-social-media-embed'
import React from 'react'

export const BrightYouTubeEmbed = (props: YouTubeEmbedProps) => {
  props = {
    width: '100%',
    ...props
  }
  return <YouTubeEmbed {...props} />
}
