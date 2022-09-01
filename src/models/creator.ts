import { BlogPostModel, ProjectModel, GQLData, AuthorModel, JobModel, allMarkdownRemarkData } from './gql'

export const createBlogPosts = (data: GQLData): BlogPostModel[] => {
  return (data.constructor === Array ? data : data.allMarkdownRemark?.edges || []).map(({ node }) => {
    const base = node.frontmatter
    return {
      ...base,
      id: node.id,
      slug: node.fields.slug,
      excerpt: node.excerpt,
      tags: base.tags ?? [],
    } as BlogPostModel
  })
}

export const createBlogRelatedPosts = (allMarkdownRemark: allMarkdownRemarkData | undefined): BlogPostModel[] => {
  return (allMarkdownRemark?.constructor === Array ? allMarkdownRemark : allMarkdownRemark?.edges || []).map(
    ({ node }) => {
      const base = node.frontmatter
      return {
        ...base,
        id: node.id,
        slug: node.fields.slug,
        excerpt: node.excerpt,
        tags: base.tags ?? [],
      } as BlogPostModel
    }
  )
}

export const createProjects = (data: GQLData): ProjectModel[] =>
  (data.allMarkdownRemark.edges || [])
    .map(({ node: { frontmatter } }: { node: { frontmatter: ProjectModel } }) => frontmatter)
    .filter((project: ProjectModel) => project.published)
    .sort((a: ProjectModel, b: ProjectModel) => (a.order || 99) - (b.order || 99))

export const createAuthors = (data: GQLData): AuthorModel[] =>
  (data.allMarkdownRemark.nodes || []).map(({ frontmatter }: { frontmatter: AuthorModel }) => frontmatter)

export const createJobs = (data: GQLData): JobModel[] =>
  (data.allMarkdownRemark.edges || []).map(
    ({ node: { frontmatter, fileAbsolutePath } }: { node: { frontmatter: JobModel; fileAbsolutePath: string } }) => ({
      ...frontmatter,
      url: fileAbsolutePath,
    })
  )
