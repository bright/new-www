import { MDXProvider } from '@mdx-js/react'
import React, { ReactNode } from 'react'
import { BrightYouTubeEmbed } from './youtube-embed'
import { BrightInstagramEmbed } from './instagram-embed'

export const mdxComponents = {
  YouTubeEmbed: BrightYouTubeEmbed,
  InstagramEmbed: BrightInstagramEmbed
}

export const MDXComponentsWrapper = ({ children }: { children?: ReactNode | undefined }) =>
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
