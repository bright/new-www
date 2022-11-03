import { Node } from './src/models/gql'
import { siteMetadata, siteUrl } from './src/site-metadata'
import { ProvidePlugin } from 'webpack'
import { gatsbyPluginFeedOptions } from './src/gatsby-plugin-feed-options'
import * as path from 'path'
import { isDefined } from './src/is-defined'
import { gatsbyMdxOptions } from './src/gatsby-mdx-options'

const isProduction = process.env.GATSBY_ACTIVE_ENV === 'production'
const isDevelop = !process.env.GATSBY_ACTIVE_ENV

const generateRobotsContent = !isDevelop


export default {
  siteMetadata,
  plugins: [
    // Make sure this plugin is first in the array of plugins
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: isProduction ? ['UA-29336006-1', 'G-H4MTQGSVD3', 'AW-10942749476'] : []
      }
    },
    !isDevelop ? {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: `${process.env.GATSBY_ACTIVE_ENV === 'production' ? '1256554391514599' : ''}`
      }
    } : null,

    'gatsby-plugin-react-helmet',
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
        develop: false, // Enable while using `gatsby develop`
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
      resolve: `gatsby-plugin-mdx`,
      options: gatsbyMdxOptions
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`,
        enableIdentityWidget: true,
        publicPath: `admin`,
        htmlTitle: `Content Manager`,
        customizeWebpackConfig: (config: any) => {
          config.resolve = {
            ...config.resolve,
            alias: {
              ...config.resolve.alias,
              // https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/#requireresolve
              // path: require.resolve("path-browserify")
              path: path.resolve(path.join(__dirname, 'node_modules', 'path-browserify')),
              // may be required by netlify-cms-widget-mdx
              process: path.resolve(path.join(__dirname, 'node_modules', 'process/browser')),
              // buffer: path.resolve(path.join(__dirname, 'node_modules', 'buffer'))
            },
            fallback: {
              ...config.resolve.fallback,
              fs: false,
              child_process: false,
              module: false,
              assert: false
            }
          }
          // required by netlify-cms-widget-mdx
          config.plugins = [
            ...config.plugins,
            new ProvidePlugin({
              process: path.resolve(path.join(__dirname, 'node_modules', 'process/browser'))
            }),
            // required by @mdx-js/mdx/node_modules/jsesc/jsesc.js
            new ProvidePlugin({
              Buffer: path.resolve(path.join(__dirname, 'node_modules', 'buffer'))
            })
          ]
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    generateRobotsContent ? {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/'
      }
    } : null,
    generateRobotsContent ? {
      resolve: `gatsby-plugin-feed`,
      options: gatsbyPluginFeedOptions(siteMetadata)
    } : null,
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
    generateRobotsContent ? {
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
    } : null,
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
                allMdx(filter: {frontmatter: {layout: {eq: "post"}}}){
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
                              allMdx: { posts }
                            }
                          }: { data: { allMdx: { posts: Node[] } } }) => ({
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
  ].filter(isDefined),
  mapping: {
    'Mdx.frontmatter.faqs': `Mdx.frontmatter.faqs_id`,
    'Mdx.frontmatter.project': `Mdx.frontmatter.project_id`
  }
}
