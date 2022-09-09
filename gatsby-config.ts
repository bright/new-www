import { GQLData, Node } from './src/models/gql'
import { GatsbyConfig } from 'gatsby'

const siteUrl = new URL(process.env.SITE_URL || 'https://brightinventions.pl/')
const isProduction = process.env.GATSBY_ACTIVE_ENV === 'production'

export default {
  siteMetadata: {
    title: 'Bright Inventions',
    description:
      'The best custom software development company in Poland. Through mobile apps and complex backend systems to emerging technology solutions we are creating success stories for startups, consultancy agencies as well as mid-size organisations across multiple industries including FinTech, Blockchain, HealthTech, Retail, Logistics and more.',
    author: 'Bright team',
    disqusShortname: 'brightinventions',
    siteUrl: siteUrl.href
  },

  plugins: [
    // Make sure this plugin is first in the array of plugins
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: isProduction ? ['UA-29336006-1', 'G-H4MTQGSVD3', 'AW-10942749476'] : []
      }
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: `${process.env.GATSBY_ACTIVE_ENV === 'production' ? '1256554391514599' : ''}`
      }
    },

    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/images/favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `md-projects`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/faqs`,
        name: `md-faqs`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/our-areas`,
        name: `md-our_areas`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/members`,
        name: `md-members`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/jobs`,
        name: `md-jobs`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `md-jobs`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: `${__dirname}/static/fonts/`
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `brightinventions`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        ignore: [
          '/carousel.min.css',
          'prismjs/',
          'style/bulma/sass/components/modal.sass',
          '/swiper.min.css',
          '/pagination.min.css'
        ], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
        purgeCSSOptions: {
          // https://purgecss.com/configuration.html#options
          safelist: [
            'blockquote',
            '.content blockquote',
            'is-active',
            'modal',
            'modal-card',
            'modal-title',
            'modal-card-body',
            'content',
            'modal is-active',
            'modal-close',
            'modal-close is-large'
          ] // Don't remove this selector
        }
        // More options defined here https://purgecss.com/configuration.html#options
      }
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
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
            resolve: `gatsby-remark-relative-images`
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
            resolve: `gatsby-remark-prismjs`
          },
          {
            resolve: `gatsby-remark-autolink-headers`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`,
        enableIdentityWidget: true,
        publicPath: `admin`,
        htmlTitle: `Content Manager`
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/'
      }
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: process.env.DEPLOY_S3_BUCKET_NAME || 'brightinventions-pl-website-content',
        protocol: 'https',
        hostname: siteUrl.hostname,
        region: 'eu-central-1'
      }
    },

    {
      resolve: `gatsby-plugin-loadable-components-ssr`,
      options: {
        // Whether replaceHydrateFunction should call ReactDOM.hydrate or ReactDOM.render
        // Defaults to ReactDOM.render on develop and ReactDOM.hydrate on build
        useHydrate: true
      }
    },
    {
      resolve: 'gatsby-plugin-force-trailing-slashes',
      options: {}
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl.href,
        sitemap: `${siteUrl.href}sitemap-index.xml`,
        env: {
          staging: {
            policy: [{ userAgent: '*', disallow: ['/'] }]
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }]
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        includeInDevelopment: false, // optional parameter to include script in development
        id: isProduction ? '2864857' : '',
        sv: isProduction ? '6' : ''
      }
    },

    {
      resolve: 'gatsby-plugin-json-pages',
      options: {
        pages: [
          {
            fileName: 'blog-posts-meta',
            query: `
              query PostTags {
                allMarkdownRemark(filter: {frontmatter: {layout: {eq: "post"}}}){
                  posts: nodes {
                    frontmatter {
                      tags
                    }
                  }
                }
              }
            `,
            transformer: ({
                            data: {
                              allMarkdownRemark: { posts }
                            }
                          }: { data: { allMarkdownRemark: { posts: Node[] } } }) => ({
              tags: [...new Set(posts.flatMap(post => post.frontmatter?.tags ?? []))]
            })
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: [{ regex: '^/blog/.+' }],
        height: 2,
        prependToBody: false,
        color: `#f7931e`,
        footerHeight: 1000,
        headerHeight: 73
      }
    }
  ],
  mapping: {
    'MarkdownRemark.frontmatter.faqs': `MarkdownRemark.frontmatter.faqs_id`,
    'MarkdownRemark.frontmatter.project': `MarkdownRemark.frontmatter.project_id`
  }
}
