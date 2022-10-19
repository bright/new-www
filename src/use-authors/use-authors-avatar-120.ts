import { graphql, useStaticQuery } from 'gatsby'
import { AuthorsFrontmatterQueryResult, toAuthors } from './authors-frontmatter-query-result'

const useAuthorsAvatars120Query: () => AuthorsFrontmatterQueryResult = () =>
  useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { author_id: { ne: null } } }) {
        nodes {
          frontmatter {
            author_id
            avatar {
              childImageSharp {
                gatsbyImageData(width: 120, quality: 90)
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

export const useAuthorsAvatars120 = () => toAuthors(useAuthorsAvatars120Query())
