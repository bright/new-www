import YouTube, { YouTubeProps } from 'react-youtube'
import { MDXProvider } from '@mdx-js/react'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

const YouTubeStyled = styled(YouTube)`
  // hardcoded based on https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-responsive-iframe/src/index.js#L59
  padding-bottom: 56.49999999999999%;
  position: relative;
  height: 0;
  overflow: hidden;
`

const YouTubeWrapper = (props: YouTubeProps) => {
  props = {
    opts: {
      width: '100%',
      height: '100%'
    },
    ...props
  }
  return <YouTubeStyled  {...props} />
}


export const mdxComponents = {
  YouTube: YouTubeWrapper
}

export const MDXComponentsWrapper = ({ children }: { children?: ReactNode | undefined }) =>
  <MDXProvider components={mdxComponents}>{children}</MDXProvider>
