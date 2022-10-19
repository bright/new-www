import { IGatsbyImageData } from 'gatsby-plugin-image'
import { string } from 'prop-types'

export type Tag = string

export interface Node {
  frontmatter: any
}

export interface Edge {
  node: any
}

export interface allMarkdownRemarkData {
  nodes?: Node[]
  edges: Edge[]
}

export interface GQLData {
  allMdx: {
    nodes?: Node[]
    edges: Edge[]
  }
}

export interface BlogPostModel {
  node: any
  id: string
  author: string
  author_id: unknown
  comments: boolean
  date: string
  dateModified: string
  slug: string
  excerpt: string
  image: IGatsbyImageData
  tags: Tag[]
  title: string
}

export interface ProjectModel {
  title: string
  slug: string
  image: IGatsbyImageData
  layout: string
  published: string
  order?: number
  tags?: Tag[]
  description?: string
}

export interface AuthorModel {
  name: string
  short_name: string
  avatar: string
  author_id: string
}

export interface JobModel {
  hours: string
  salary: string
  title: string
  subtitle?: string
  url: string
}

export interface ServiceModel {
  title: string
  slug: string
  our_services_icon: IGatsbyImageData
  layout: string
  short_description: string
  name: string
}
