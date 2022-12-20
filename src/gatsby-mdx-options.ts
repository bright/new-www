import remarkGfm from 'remark-gfm'
const rehypePrism = require('@mapbox/rehype-prism')
import type { PluginTuple} from 'unified'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax'

export const gatsbyMdxOptions = {
  extensions: [`.md`, `.mdx`],
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
      remarkMath
    ],
    rehypePlugins: [
      [rehypePrism, { ignoreMissing: true }] as PluginTuple,
      rehypeMathJax
    ]
  },
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
