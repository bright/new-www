import { graphql, useStaticQuery } from 'gatsby'
import { AuthorsFrontmatterQueryResult, toAuthors } from './authors-frontmatter-query-result'

const useAuthorsAvatars64Query: () => AuthorsFrontmatterQueryResult = () =>
  useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { frontmatter: { author_id: { ne: null } } }) {
        nodes {
          frontmatter {
            author_id
            avatar {
              childImageSharp {
                gatsbyImageData(width: 64)
              }
            }
            bio
            name
            web
          }
        }
      }
    }
  `)

export const useAuthorsAvatars64 = () => toAuthors(useAuthorsAvatars64Query())
