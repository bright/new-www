import { Node } from './src/models/gql'
import { siteMetadata, siteUrl } from './src/site-metadata'
import { ProvidePlugin } from 'webpack'
import { gatsbyPluginFeedOptions } from './src/gatsby-plugin-feed-options'
import * as path from 'path'
import { isDefined } from './src/is-defined'
import { gatsbyMdxOptions } from './src/gatsby-mdx-options'
import { PartialWebpackConfig } from './src/partial-webpack-config'
import { GatsbyConfig } from 'gatsby'
import { googleTagManagerUrl } from './plugins/google-gtag/google-tag-manager-url'
import { googleTrackingIds } from './src/google-tracking-ids'
import { partytownEnabled } from './src/partytown'
import adapter from './adapter'

const gatsbyActiveEnv = process.env.GATSBY_ACTIVE_ENV! as 'production' | 'staging' | 'develop'
const isProduction = gatsbyActiveEnv === 'production'
const isDevelop = !gatsbyActiveEnv

const generateRobotsContent = !isDevelop

const enableHotjar = false //to enable hotjar globally set the value to true

const facebookPixelId = isProduction ? '1256554391514599' : ''

const googleTrackingIdsForEnv = googleTrackingIds(gatsbyActiveEnv)

const enableWebpackBundleAnalyser = process.env.WEBPACK_BUNDLE_ANALYSER_ENABLE == 'true'

const gatsbyConfig: GatsbyConfig = {
  adapter: adapter(),
  flags: {
    DEV_SSR: true,
    // FAST_DEV: true
  },
  siteMetadata,
  partytownProxiedURLs: partytownEnabled
    ? [
        googleTrackingIdsForEnv[0] ? googleTagManagerUrl(googleTrackingIdsForEnv[0]) : null,
        'https://connect.facebook.net/en_US/fbevents.js',
      ].filter(isDefined)
    : [],
  plugins: [
    {
      resolve: `google-gtag`,
      options: {
        trackingIds: googleTrackingIdsForEnv,
        partytownEnabled: partytownEnabled,
      },
    },
    {
      resolve: `facebook-pixel`,
      options: {
        pixelId: facebookPixelId,
      },
    },
    {
      resolve: `hotjar`,
      options: {
        id: enableHotjar && isProduction ? '2864857' : '',
        sv: enableHotjar && isProduction ? '6' : '',
      },
    },
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
        background_color: '#fff',
        theme_color: '#fff',
        theme_color_in_head: false, // This will avoid adding theme-color meta tag.
        display: 'minimal-ui',
        icon: 'static/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `md-projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/faqs`,
        name: `md-faqs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/our-areas`,
        name: `md-our_areas`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/members`,
        name: `md-members`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/jobs`,
        name: `md-jobs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog/`,
        name: `md-jobs`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: `${__dirname}/static/fonts/`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `brightinventions`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
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
          '/pagination.min.css',
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
            'modal-close is-large',
          ], // Don't remove this selector
        },
        // More options defined here https://purgecss.com/configuration.html#options
      },
    },

    {
      resolve: `gatsby-plugin-mdx`,
      options: gatsbyMdxOptions,
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.ts`,
        enableIdentityWidget: true,
        publicPath: `admin`,
        htmlTitle: `Content Manager`,
        customizeWebpackConfig: (config: PartialWebpackConfig) => {
          config.devtool = false // does
          config.resolve = {
            ...config.resolve,
            alias: {
              ...config.resolve?.alias,
              // https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/#requireresolve
              // path: require.resolve("path-browserify")
              path: path.resolve(path.join(__dirname, 'node_modules', 'path-browserify')),
              // may be required by netlify-cms-widget-mdx
              process: path.resolve(path.join(__dirname, 'node_modules', 'process/browser')),
              // buffer: path.resolve(path.join(__dirname, 'node_modules', 'buffer'))
            },
            fallback: {
              ...config.resolve?.fallback,
              fs: false,
              child_process: false,
              module: false,
              assert: false,
            },
          }
          // required by netlify-cms-widget-mdx
          config.plugins = [
            ...(config.plugins ?? []),
            new ProvidePlugin({
              process: path.resolve(path.join(__dirname, 'node_modules', 'process/browser')),
            }),
            // required by @mdx-js/mdx/node_modules/jsesc/jsesc.js
            new ProvidePlugin({
              Buffer: path.resolve(path.join(__dirname, 'node_modules', 'buffer')),
            }),
          ]
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    generateRobotsContent
      ? {
          resolve: `gatsby-plugin-sitemap`,
          options: {
            output: '/',
          },
        }
      : null,
    generateRobotsContent
      ? {
          resolve: `gatsby-plugin-feed`,
          options: gatsbyPluginFeedOptions(siteMetadata),
        }
      : null,
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: process.env.DEPLOY_S3_BUCKET_NAME || 'brightinventions-pl-website-content',
        protocol: 'https',
        hostname: siteUrl.hostname,
        region: 'eu-central-1',
      },
    },
    generateRobotsContent
      ? {
          resolve: 'gatsby-plugin-robots-txt',
          options: {
            host: siteUrl.href,
            sitemap: `${siteUrl.href}sitemap-index.xml`,
            env: {
              staging: {
                policy: [{ userAgent: '*', disallow: ['/'] }],
              },
              production: {
                policy: [{ userAgent: '*', allow: '/' }],
              },
            },
          },
        }
      : null,

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
                allMdx: { posts },
              },
            }: {
              data: { allMdx: { posts: Node[] } }
            }) => ({
              tags: [...new Set(posts.flatMap(post => post.frontmatter?.tags ?? []))],
            }),
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: [{ regex: '^/blog/.+' }],
        height: 2,
        prependToBody: false,
        color: `#f7931e`,
        footerHeight: 1000,
        headerHeight: 73,
      },
    },
    'simple-mdx',
    'content-collections',
    'scss-typescript',
    'cms-config',
    'plausible',
    enableWebpackBundleAnalyser ? 'gatsby-plugin-webpack-bundle-analyser-v2' : null,
  ].filter(isDefined),
  mapping: {
    'Mdx.frontmatter.faqs': `Mdx.frontmatter.faqs_id`,
    'Mdx.frontmatter.project': `Mdx.frontmatter.project_id`,
    'Mdx.frontmatter.our_service': `Mdx.frontmatter.our_service_id`,
  },
  graphqlTypegen: true,
  trailingSlash: 'always', // a default in Gatsby 5
}
export default gatsbyConfig
