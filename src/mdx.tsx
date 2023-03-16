import { MDXProvider } from '@mdx-js/react'
import React, { PropsWithChildren } from 'react'
import { BrightYouTubeEmbed } from './youtube-embed'
import { BrightInstagramEmbed } from './instagram-embed'
import { GiphyEmbed } from './giphy-embed'
import { BrightTwitterEmbed } from './twitter-embed'
import { EbookDynamic } from './ebook-dynamic'

export const mdxComponents = {
  YouTubeEmbed: BrightYouTubeEmbed,
  InstagramEmbed: BrightInstagramEmbed,
  TwitterEmbed: BrightTwitterEmbed,
  GiphyEmbed: GiphyEmbed,
  EbookDynamic: EbookDynamic,
}

export const MDXComponentsWrapper = ({ children }: PropsWithChildren<any>) => (
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
)
