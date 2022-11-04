import { gatsbyMdxOptions } from '../gatsby-mdx-options'
import { mdxComponents } from '../mdx'

const MDX = require('@mdx-js/runtime').default

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
