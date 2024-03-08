import { blogListForTagGroupsBasePath } from './blog-post-paths'
import { TagGroup } from './tags/tag-groups'
import type { Actions } from 'gatsby'

export function addRedirectsFromAliases(tagGroups: TagGroup[], createRedirect: Actions['createRedirect']) {
  const current = tagGroups.at(-1);

  if (current?.aliases?.length) {
    current.aliases.forEach(alias => {
      createRedirect({
        fromPath: `/blog/${alias}/`,
        toPath: `${blogListForTagGroupsBasePath(...tagGroups)}/1/`,
        statusCode: 301,
      })
    })
  }
}