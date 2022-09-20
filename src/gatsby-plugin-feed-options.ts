import { SiteMetadata } from './site-metadata'
import { GQLData } from './models/gql'
import { loadTagGroupsSync } from './tag-groups'
import { blogListForTagGroupsBasePath } from './blog-post-paths'

const feedGQL = (tags?: string[]) => {
  const tagsFilter = tags ? `tags: { in: [${tags.map(t => `"${t}"`)}] }` : ''
  return `
      {
          allMarkdownRemark(
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
                      excerpt(pruneLength: 500)
                      html
                      frontmatter {
                        title
                        date
                      }
                      fields {
                          slug
                      }
                  }
              }
          }
      }
  `
}

function serializePostsToFeed(siteMetadata: SiteMetadata) {
  return ({ query: { allMarkdownRemark } }: { query: GQLData }) => {
    const posts = allMarkdownRemark.edges!
    const feed = posts.map(({ node }) => {
      const slug = node.fields.slug.startsWith('/') ? node.fields.slug.substring(1) : node.fields.slug
      return Object.assign({}, node.frontmatter, {
        title: node.frontmatter.title,
        description: node.excerpt,
        date: node.frontmatter.date,
        url: siteMetadata.siteUrl + slug,
        guid: siteMetadata.siteUrl + slug,
        custom_elements: [{ 'content:encoded': node.html }]
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
