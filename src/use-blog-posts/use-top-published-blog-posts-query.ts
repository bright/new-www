import { graphql, useStaticQuery } from 'gatsby'
import { BlogPostsFrontmatterQueryResult } from './blog-post-frontmatter-query-result'

export const useTopPublishedBlogPostsQuery: () => BlogPostsFrontmatterQueryResult = () => {
  const {
    allMdx: { posts },
  } = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { frontmatter: { layout: { eq: "post" }, published: { ne: false }, hidden: { ne: true } } }
        sort: {fields: fields___modifiedAt, order: DESC}
        limit: 4
      ) {
        posts: nodes {
          id
          internal {  contentFilePath  }
          excerpt(pruneLength: 500)
          frontmatter {
            excerpt
            comments
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            author
            title
            tags
            date
            meaningfullyUpdatedAt
          }
          fields {
            slug
            timeToRead { minutes }
          }
        }
      }
    }
  `)

  return posts
}
