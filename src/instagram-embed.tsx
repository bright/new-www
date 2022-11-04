import { InstagramEmbed, InstagramEmbedProps } from 'react-social-media-embed'
import React from 'react'

export const BrightInstagramEmbed = (props: InstagramEmbedProps) => {
  props = {
    width: '100%',
    ...props
  }
  return <InstagramEmbed {...props} />
}
