import { IGatsbyImageData } from 'gatsby-plugin-image'

interface BlogPostsFrontmatterItem {
  title: string
  date: string
  dateModified: string
  excerpt: string
  image: IGatsbyImageData
  layout: string
  published?: boolean
  hidden?: boolean
  comments?: boolean
  tags?: string[]
  order?: number
}

interface BlogPostsQueryResultItem {
  frontmatter: BlogPostsFrontmatterItem
  fields: {
    slug: string
    timeToRead: {
      minutes: number
    }
  }
}

export type BlogPostsFrontmatterQueryResult = BlogPostsQueryResultItem[]

type BlogPost = ReturnType<typeof toBlogPost>

export function toBlogPost(item: BlogPostsQueryResultItem) {
  return {
    title: item.frontmatter.title,
    date: item.frontmatter.date,
    dateModified: item.frontmatter.dateModified,
    excerpt: item.frontmatter.excerpt,
    image: item.frontmatter.image,
    tags: item.frontmatter.tags || [],
    published: item.frontmatter.published ?? true,
    hidden: item.frontmatter.hidden ?? false,
    comments: item.frontmatter.comments ?? true,
    order: item.frontmatter.order ?? 0,
    slug: item.fields.slug,
  }
}
