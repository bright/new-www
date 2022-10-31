import { BlogPostModel, ProjectModel, GQLData, AuthorModel, JobModel, allMdxData } from './gql'

export const createBlogPosts = (data: GQLData): BlogPostModel[] => {
  return (data.constructor === Array ? data : data.allMdx?.edges || [])
    .map(({ node }) => {
      const base = node.frontmatter
      return {
        ...base,
        id: node.id,
        slug: node.fields.slug,
        excerpt: node.excerpt,
        tags: base.tags ?? [],
      } as BlogPostModel
    })
    .sort(function (a, b) {
      return (
        new Date(b.meaningfullyUpdatedAt).getTime() - new Date(a.meaningfullyUpdatedAt).getTime() ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    })
}

export const createBlogRelatedPosts = (allMdx: allMdxData | undefined): BlogPostModel[] => {
  return (allMdx?.constructor === Array ? allMdx : allMdx?.edges || [])
    .map(({ node }) => {
      const base = node.frontmatter
      return {
        ...base,
        id: node.id,
        slug: node.fields.slug,
        excerpt: node.excerpt,
        tags: base.tags ?? [],
      } as BlogPostModel
    })
    .sort(function (a, b) {
      return (
        new Date(b.meaningfullyUpdatedAt).getTime() - new Date(a.meaningfullyUpdatedAt).getTime() ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    })
}

export const createProjects = (data: GQLData): ProjectModel[] =>
  (data.allMdx.edges || [])
    .map(({ node: { frontmatter } }: { node: { frontmatter: ProjectModel } }) => frontmatter)
    .filter((project: ProjectModel) => project.published)
    .sort((a: ProjectModel, b: ProjectModel) => (a.order || 99) - (b.order || 99))

export const createAuthors = (data: GQLData): AuthorModel[] =>
  (data.allMdx.nodes || []).map(({ frontmatter }: { frontmatter: AuthorModel }) => frontmatter)

export const createJobs = (data: GQLData): JobModel[] =>
  (data.allMdx.edges || []).map(
    ({ node: { frontmatter, internal: {  contentFilePath  } } }: { node: { frontmatter: JobModel; internal: { contentFilePath: string } } }) => ({
      ...frontmatter,
      url: contentFilePath,
    })
  )
