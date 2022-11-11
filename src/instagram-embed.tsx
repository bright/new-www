import { InstagramEmbed, InstagramEmbedProps } from 'react-social-media-embed/dist/components/embeds/InstagramEmbed'
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
