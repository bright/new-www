import { MDXProvider } from '@mdx-js/react'
import React, { PropsWithChildren } from 'react'
import { BrightYouTubeEmbed } from './youtube-embed'
import { BrightInstagramEmbed } from './instagram-embed'
import { GiphyEmbed } from './giphy-embed'
import { BrightTwitterEmbed } from './twitter-embed'
import { EbookDynamic } from './ebook-dynamic'
import { TitleWithIcon } from './title-with-icon'
import { Gallery } from './gallery-icons'
import { SliderText } from './slider-text'
import { AppStore } from './app-store'
import { AnchorLink } from './button-anchor'
import { MDXComponents } from 'mdx/types'
import { PhotoSlider } from './photo-slider'


export const mdxComponents: MDXComponents = {
  YouTubeEmbed: BrightYouTubeEmbed,
  InstagramEmbed: BrightInstagramEmbed,
  TwitterEmbed: BrightTwitterEmbed,
  GiphyEmbed: GiphyEmbed,
  EbookDynamic: EbookDynamic,
  TitleWithIcon: TitleWithIcon,
  Gallery: Gallery,
  SliderText: SliderText,
  AppStore: AppStore,
  AnchorLink: AnchorLink,
  PhotoSlider: PhotoSlider,
}

export const MDXComponentsWrapper = ({ children }: PropsWithChildren<any>) => (
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
)
