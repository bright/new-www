import { InstagramEmbed, InstagramEmbedProps } from 'react-social-media-embed'
import React from 'react'
import { useFrame } from 'react-frame-component'

export const BrightInstagramEmbed = (props: InstagramEmbedProps) => {
  const frame = useFrame()
  props = {
    width: '100%',
    frame,
    ...props
  }
  return <InstagramEmbed {...props} />
}
