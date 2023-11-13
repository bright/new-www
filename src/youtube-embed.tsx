import { YouTubeEmbed, YouTubeEmbedProps } from 'react-social-media-embed/dist/components/embeds/YouTubeEmbed'
import React from 'react'

export const BrightYouTubeEmbed = (props: YouTubeEmbedProps) => {
  const youTubeProps = { style: { maxWidth: "640px", display: "block", margin: "auto" } }
  props = {
    width: '100%',
    height: '360px',
    youTubeProps,
    ...props
  }
  return <YouTubeEmbed {...props} />
}
