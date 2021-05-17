import { IGatsbyImageData } from 'gatsby-plugin-image'

interface AuthorsFrontmatterItem {
  author_id: string
  avatar: IGatsbyImageData
  bio: string
  name: string
  web: string | undefined
}

export interface Author {
  authorId: string
  name: string
  bio: string
  avatar: IGatsbyImageData
}

function toAuthor(frontmatter: AuthorsFrontmatterItem) {
  return {
    authorId: frontmatter.author_id,
    bio: frontmatter.bio,
    avatar: frontmatter.avatar,
    name: frontmatter.name,
  }
}

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
