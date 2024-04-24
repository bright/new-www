import { CreatePagesArgs } from 'gatsby'
import { GQLData } from './models/gql'

export async function queryPostsSlug({ graphql, tags }: Pick<CreatePagesArgs, 'graphql'> & { tags?: string }) {
  const tagsFilter = tags ? `tags: { in: ${tags} }` : ''
  return await graphql<GQLData>(`
      query PostSlug {
          allMdx(
              filter: { 
                frontmatter: { 
                  layout: { eq: "post" } 
                  published: { ne: false } 
                  hidden: { ne: true }
                  ${tagsFilter}
                } 
              }
              sort: [{ frontmatter:  { modified: DESC } }]
              limit: 1000
          ) {
              edges {
                  node {
                      fields {
                          slug
                      }
                  }
              }
          }
      }
  `)
}
