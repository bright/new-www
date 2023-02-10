import { TwitterEmbed, TwitterEmbedProps } from 'react-social-media-embed/dist/components/embeds/TwitterEmbed'
import React from 'react'

export const BrightTwitterEmbed = (props: TwitterEmbedProps) => {
  props = {
    ...props
  }
  return <TwitterEmbed {...props} />
}
