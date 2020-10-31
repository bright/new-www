import {BlogPostModel, ProjectModel, GQLData} from './gql'

export const createBlogPosts = (data: GQLData): BlogPostModel[] => (
    data.allMarkdownRemark.edges.map(({node}) => ({
        ...node.frontmatter,
        id: node.id,
        slug: node.fields.slug,
        excerpt: node.excerpt
    } as BlogPostModel))
)

export const createProjects = (data: GQLData): ProjectModel[] => (
    data.allMarkdownRemark.edges
        .map(({ node: { frontmatter } }: {node: {frontmatter: ProjectModel}}) => frontmatter)
        .filter((project: ProjectModel) => project.published)
        .sort((a: ProjectModel, b: ProjectModel) => (a.order || 99) - (b.order || 99))
)
