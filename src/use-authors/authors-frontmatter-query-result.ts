import { IGatsbyImageData } from 'gatsby-plugin-image'

interface AuthorsFrontmatterItem {
  author_id: string
  avatar: IGatsbyImageData
  avatar_hover: IGatsbyImageData
  bio: string
  name: string
  short_name: string
  hobby: string | undefined
  web: string | undefined
  ex: boolean | undefined
  slug: string | undefined
}

function toAuthor(frontmatter: AuthorsFrontmatterItem) {
  return {
    authorId: frontmatter.author_id,
    bio: frontmatter.bio,
    web: frontmatter.web,
    avatar: frontmatter.avatar,
    avatar_hover:frontmatter.avatar_hover,
    name: frontmatter.name,
    shortName: frontmatter.short_name,
    hobby: frontmatter.hobby,
    ex: !!frontmatter.ex,
    slug: frontmatter.slug
  }
}

export type Author = ReturnType<typeof toAuthor>

export function toAuthors(queryResult: AuthorsFrontmatterQueryResult): Author[] {
  return queryResult.allMdx.nodes.map(({ frontmatter }) => toAuthor(frontmatter))
}

export interface AuthorsFrontmatterQueryResult {
  allMdx: {
    nodes: {
      frontmatter: AuthorsFrontmatterItem
    }[]
  }
}
