import { SiteMetadata } from './site-metadata'
import { GQLData } from './models/gql'
import { loadTagGroupsSync } from './tag-groups'
import { blogListForTagGroupsBasePath, blogPostUrlPath } from './blog-post-paths'
import { trimStart } from 'lodash'

const feedGQL = (tags?: string[]) => {
  const tagsFilter = tags ? `tags: { in: [${tags.map(t => `"${t}"`)}] }` : ''
  return `
      {
          allMdx(
              filter: {
                  frontmatter: {
                      layout: { eq: "post" }
                      published: { ne: false }
                      hidden: { ne: true }
                      ${tagsFilter}
                  }
              }
              sort: { fields: [frontmatter___date], order: DESC}
              limit: 1000
          ) {
              edges {
                  node {
                      internal {  contentFilePath  }
                      excerpt(pruneLength: 500)
                      frontmatter {
                        title
                        date
                      }
                      fields {
                        slug
                      }
                      internal {
                        contentFilePath
                      }
                  }
              }
          }
      }
  `
}

function serializePostsToFeed(siteMetadata: SiteMetadata) {
  return ({ query: { allMdx } }: { query: GQLData }) => {
    const posts = allMdx.edges!
    const feed = posts.map(({ node }) => {
      const url = siteMetadata.siteUrl + trimStart(blogPostUrlPath(node), '/')
      return Object.assign({}, node.frontmatter, {
        title: node.frontmatter.title,
        description: node.excerpt,
        date: node.frontmatter.date,
        url: url,
        guid: url,
        // since we're using mdx we don't have html rendered accessible from graphql
        // custom_elements: [{ 'content:encoded': node.html }]
      })
    })
    return feed
  }
}

export const gatsbyPluginFeedOptions = (siteMetadata: SiteMetadata) => ({
  feeds: [
    {
      serialize: serializePostsToFeed(siteMetadata),
      query: feedGQL(),
      output: '/blog/rss.xml',
      title: `${siteMetadata.title} Blog RSS Feed`
    },
    ...loadTagGroupsSync().allGroups.map(group => {
      const query = feedGQL(group.tags)
      return {
        serialize: serializePostsToFeed(siteMetadata),
        query: query,
        output: blogListForTagGroupsBasePath(...group.ancestorsIncludingSelf) + '/rss.xml',
        title: `${siteMetadata.title} ${group.name} RSS Feed`
      }
    })
  ]
})
