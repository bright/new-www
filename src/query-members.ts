export async function querySlugAuthorIdAndIdFromMembers<TData, TVariables>(
  graphql: <TData, TVariables = any>(
    query: string,
    variables?: TVariables
  ) => Promise<{
    errors?: any
    data?: TData
  }>
) {
  return await graphql<Queries.AboutUsMembersListingQuery>(`
    query AboutUsMembersListing {
      allMembers {
        nodes {
          id
          internal {
            contentFilePath
          }
          slug
          author_id
          ex
        }
      }
    }
  `)
}

