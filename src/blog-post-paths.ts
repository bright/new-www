import type { TagGroup } from './tag-groups'
import _ from 'lodash'
import { urlSegmentForContentPath } from './url-segment-for-content-path'

export function blogListForTagGroupsBasePath(...tagGroups: TagGroup[]) {
  return `/blog/${tagGroups.map(group => _.kebabCase(group.name)).join('/')}`
}

export function blogPostUrlPath(postNode: { frontmatter: { slug?: string }, fileAbsolutePath: string }) {
  return '/blog/' + (postNode.frontmatter.slug || urlSegmentForContentPath(postNode.fileAbsolutePath))
}
