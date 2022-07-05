import { graphql, useStaticQuery } from 'gatsby'
import { AuthorsFrontmatterQueryResult, toAuthors } from './authors-frontmatter-query-result'

const useAuthorsAvatarsDefaultQuery: () => AuthorsFrontmatterQueryResult = () =>
  useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { frontmatter: { author_id: { ne: null } } }, sort: { fields: frontmatter___name }) {
        nodes {
          frontmatter {
            author_id
            avatar {
              childImageSharp {
                gatsbyImageData
              }
            }
            avatar_hover {
              childImageSharp {
                gatsbyImageData
              }
            }
            name
            short_name
            slug
            bio
            hobby
            ex
          }
        }
      }
    }
  `)

export const useAuthorsAvatarsDefault = () => toAuthors(useAuthorsAvatarsDefaultQuery())
