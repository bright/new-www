import { graphql } from "gatsby"

export default graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { ex: { ne: true }, author_id: { ne: null } } }
        sort: { fields: frontmatter___author_id }
      ) {
        nodes {
          frontmatter {
            avatar
            author_id
            name
            short_name
          }
        }
      }
    }
  `
