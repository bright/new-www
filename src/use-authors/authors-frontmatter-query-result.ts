import { IGatsbyImageData } from 'gatsby-plugin-image'

interface AuthorsFrontmatterItem {
  author_id: string
  avatar: IGatsbyImageData
  bio: string
  name: string
  short_name: string
  hobby: string | undefined
  web: string | undefined
}

function toAuthor(frontmatter: AuthorsFrontmatterItem) {
  return {
    authorId: frontmatter.author_id,
    bio: frontmatter.bio,
    web: frontmatter.web,
    avatar: frontmatter.avatar,
    name: frontmatter.name,
    shortName: frontmatter.short_name,
    hobby: frontmatter.hobby,
  }
}

export type Author = ReturnType<typeof toAuthor>

export function toAuthors(queryResult: AuthorsFrontmatterQueryResult): Author[] {
  return queryResult.allMarkdownRemark.nodes.map(({ frontmatter }) => toAuthor(frontmatter))
}

export interface AuthorsFrontmatterQueryResult {
  allMarkdownRemark: {
    nodes: {
      frontmatter: AuthorsFrontmatterItem
    }[]
  }
}
