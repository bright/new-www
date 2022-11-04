import { gatsbyMdxOptions } from '../gatsby-mdx-options'
import { mdxComponents } from '../mdx'
import React, { Suspense, useEffect, useRef } from 'react'
import { loadAndProcessInstagramEmbedsIn } from '../instagram-embed'

// @ts-ignore
const MDX = React.lazy(() => import('@mdx-js/runtime'))

interface MdxPreviewProps {
  value: string // actual mdx
}

async function attachScriptsThatDoNotWorkInPreviewAndAreRequiredForEmbedding(document: Document) {
  loadAndProcessInstagramEmbedsIn(document)
}

export const MdxPreview = ({ value }: MdxPreviewProps) => {
  // netlify cms preview is rendered in an iframe
  // however the embed react components attach external scripts
  // to outer window, this in turn doesn't process embedded docs inside iframe
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const document = ref.current?.ownerDocument
    if (document) {
      attachScriptsThatDoNotWorkInPreviewAndAreRequiredForEmbedding(document)
    }
  }, [ref.current?.ownerDocument])

  return <Suspense fallback={<div>Loading...</div>}>
    <MDX ref={ref}
         remarkPlugins={gatsbyMdxOptions.mdxOptions.remarkPlugins}
         rehypePlugins={gatsbyMdxOptions.mdxOptions.rehypePlugins}
         components={mdxComponents}
    >
      {value}
    </MDX>
    <div style={{ display: 'none' }} ref={ref} />
  </Suspense>
}
