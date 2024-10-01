import { IGatsbyImageData, ImageDataLike } from 'gatsby-plugin-image'
import { string } from 'prop-types'

export type Tag = string

export interface Node {
  frontmatter: any
}

export interface Edge {
  node: any
}

export interface allMdxData {
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
  meaningfullyUpdatedAt: string
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

export interface TestimonialModel {
  testimonials_quote: {
    html: string
  }
  testimonials_author: string
  testimonials_photo: IGatsbyImageData | null
  testimonials_position: string
  testimonials_company: string
}

export interface BoxesModel {
  box_title: string
  box_description: {
    html: string
  }
  box_icon: IGatsbyImageData | null
}
