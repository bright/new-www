import { MDXProvider } from '@mdx-js/react'
import React, { ReactNode } from 'react'
import { YouTubeWrapper } from './youtube'

export const mdxComponents = {
  YouTube: YouTubeWrapper
}

export const MDXComponentsWrapper = ({ children }: { children?: ReactNode | undefined }) =>
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
