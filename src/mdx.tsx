import { MDXProvider } from '@mdx-js/react'
import React, { PropsWithChildren } from 'react'
import { BrightYouTubeEmbed } from './youtube-embed'
import { BrightInstagramEmbed } from './instagram-embed'
import { GiphyEmbed } from './giphy-embed'

export const mdxComponents = {
  YouTubeEmbed: BrightYouTubeEmbed,
  InstagramEmbed: BrightInstagramEmbed,
  GiphyEmbed: GiphyEmbed
}

export const MDXComponentsWrapper = ({ children }: PropsWithChildren<any>) =>
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
