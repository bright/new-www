import remarkGfm from 'remark-gfm'
const rehypePrism = require('@mapbox/rehype-prism')

export const gatsbyMdxOptions = {
  extensions: [`.md`, `.mdx`],
  mdxOptions: {
    remarkPlugins: [
      remarkGfm
    ],
    rehypePlugins: [
      [rehypePrism, { ignoreMissing: true }]
    ]
  },
  gatsbyRemarkPlugins: [
    {
      resolve: 'gatsby-remark-instagram-embed',
      options: {
        width: 320,
        height: 320
      }
    },
    {
      resolve: 'gatsby-remark-responsive-iframe'
    },
    {
      resolve: '@weknow/gatsby-remark-twitter'
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
