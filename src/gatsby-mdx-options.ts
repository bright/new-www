import remarkGfm from 'remark-gfm'
const rehypePrism = require('@mapbox/rehype-prism')

export const gatsbyMdxOptions = {
  extensions: [`.md`, `.mdx`],
  mdxOptions: {
    remarkPlugins: [
      remarkGfm
    ],
    rehypePlugins: [
      rehypePrism
    ]
  },
  gatsbyRemarkPlugins: [
    {
      resolve: 'gatsby-remark-embed-video',
      options: {
        width: 800
        // ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
        // height: 400, // Optional: Overrides optional.ratio
        // related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
        // noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
        // loadingStrategy: 'lazy', //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
        // urlOverrides: [
        //   {
        //     id: "youtube",
        //     embedURL: videoId =>
        //       `https://www.youtube-nocookie.com/embed/${videoId}`,
        //   },
        // ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
        // containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
        // iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
      }
    },
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
