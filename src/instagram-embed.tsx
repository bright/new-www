import { InstagramEmbed, InstagramEmbedProps } from 'react-social-media-embed'
import React from 'react'
import { loadScript } from './cms/load-script'
import { waitFor } from './wait-for'

export const BrightInstagramEmbed = (props: InstagramEmbedProps) => {
  props = {
    width: '100%',
    ...props
  }
  return <InstagramEmbed {...props} />
}

export function loadAndProcessInstagramEmbedsIn(document: Document) {
  loadScript('https://www.instagram.com/embed.js', document)
    .then(async () => {
      const Embed = await waitFor(() => (window as any).instgrm.Embed, { delayMillis: 1000, retry: 2 })
      Embed.process()
    })
}
