import remarkGfm from 'remark-gfm'
const rehypePrism = require('@mapbox/rehype-prism')
import type { PluginTuple} from 'unified'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax'
import { BaseProcessorOptions } from '@mdx-js/mdx/lib/core'
import { replaceImageUrlPrefix } from './replace-image-url-prefix'
import { GetAssetFunction } from './cms/mdx-preview'

export type MdxOptions = Pick<BaseProcessorOptions, 'remarkPlugins' | 'rehypePlugins'>
export const mdxOptions: MdxOptions = {
  remarkPlugins: [
    remarkGfm,
    remarkMath
  ],
  rehypePlugins: [
    [rehypePrism, { ignoreMissing: true }] as PluginTuple,
    rehypeMathJax
  ]
}
export const mdxOptionsForPreviewOnly = (getAsset: GetAssetFunction): MdxOptions => ({
  remarkPlugins: [
    // gatsby-remark-image
    // in SSR it only picks up relative paths e.g. ../../static/image/something.png
    // it doesn't pick up /image/something.png
    // thus in markdown/mdx we want a relative path
    // however, in preview i.e. in browser, gatsby-remark-image doesn't work (or at least I don't know how to make it work there)
    // and the /static/image/... path doesn't load anything
    // so when in preview, we replace ../../static/image/something.png with /image/something.png
    [replaceImageUrlPrefix, { getAsset }],
    ...mdxOptions.remarkPlugins!
  ],
  rehypePlugins: [
    ...mdxOptions.rehypePlugins!
  ]
})

export const gatsbyMdxOptions = {
  extensions: [`.md`, `.mdx`],
  mdxOptions: mdxOptions,
  gatsbyRemarkPlugins: [
    {
      resolve: 'gatsby-remark-responsive-iframe'
    },
    {
      resolve: `gatsby-remark-external-links`
    },
    {
        resolve: `gatsby-remark-mdx-relative-images`
    },
    {
      resolve: `gatsby-remark-copy-linked-files`
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        // It's important to specify the maxWidth (in pixels) of
        // the content container as this plugin uses this as the
        // base for generating different widths of each image.
        maxWidth: 960,
        linkImagesToOriginal: false
      }
    },
    {
      resolve: `gatsby-remark-autolink-headers`
    }
  ]
}
