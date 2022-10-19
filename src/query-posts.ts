import { CreatePagesArgs } from 'gatsby'

export async function queryPostsSlug({ graphql, tags }: Pick<CreatePagesArgs, 'graphql'> & { tags?: string[] }) {
  const tagsFilter = tags ? `tags: { in: ${tags} }` : ''
  return await graphql(`
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
                      fields {
                          slug
                      }
                  }
              }
          }
      }
  `)
}
