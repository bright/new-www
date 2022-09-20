import type { TagGroup } from './tag-groups'
import _ from 'lodash'

export function blogListForTagGroupsBasePath(...tagGroups: TagGroup[]) {
  return `/blog/${tagGroups.map(group => _.kebabCase(group.name)).join('/')}`
}
