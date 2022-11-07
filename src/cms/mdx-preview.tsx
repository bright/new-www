import { gatsbyMdxOptions } from '../gatsby-mdx-options'
import { mdxComponents } from '../mdx'
import React, { Suspense } from 'react'

// @ts-ignore
const MDX = React.lazy(() => import('@mdx-js/runtime'))

interface MdxPreviewProps {
  value: string // actual mdx
}

export const MdxPreview = ({ value }: MdxPreviewProps) => {
  return <Suspense fallback={<div>Loading...</div>}>
    <MDX remarkPlugins={gatsbyMdxOptions.mdxOptions.remarkPlugins}
         rehypePlugins={gatsbyMdxOptions.mdxOptions.rehypePlugins}
         components={mdxComponents}
    >
      {value}
    </MDX>
  </Suspense>
}
