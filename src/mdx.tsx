import { MDXProvider } from '@mdx-js/react'
import React, { PropsWithChildren } from 'react'
import { BrightYouTubeEmbed } from './youtube-embed'
import { BrightInstagramEmbed } from './instagram-embed'

export const mdxComponents = {
  YouTubeEmbed: BrightYouTubeEmbed,
  InstagramEmbed: BrightInstagramEmbed
}

export const MDXComponentsWrapper = ({ children }: PropsWithChildren<any>) =>
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
