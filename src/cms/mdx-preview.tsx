const MDX = require('@mdx-js/runtime').default

import { gatsbyMdxOptions } from '../gatsby-mdx-options'

const mdxComponents = {
  // pre
}

interface MdxPreviewProps {
  value: string // actual mdx
}

export const MdxPreview = ({ value }: MdxPreviewProps) => {
  return <MDX
    remarkPlugins={gatsbyMdxOptions.mdxOptions.remarkPlugins}
    rehypePlugins={gatsbyMdxOptions.mdxOptions.rehypePlugins}
    components={mdxComponents}
  >
    {value}
  </MDX>
}
