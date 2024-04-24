import { GatsbyNode } from 'gatsby'
import config, { authorFieldNames, blogCollectionName } from '../../static/admin/config'
import { writeFile } from 'fs/promises'
import path from 'path'
import yaml from 'js-yaml'

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {
  const cfg = { ...(await config()) }

  const authors = await graphql<Queries.ActiveMembersQuery>(`
    query ActiveMembers {
      allMembers(filter: { ex: { ne: true } }) {
        nodes {
          name
          author_id
        }
      }
    }
  `)
  const blog = cfg.collections.find(c => c.name == blogCollectionName)!
  const authorsAsOptionSelects = authors.data!.allMembers?.nodes?.map(({ author_id, name }) => ({
    label: name,
    value: author_id,
  }))

  blog.fields = blog.fields.map(f => {
    if (authorFieldNames.includes(f.name)) {
      return {
        ...f,
        widget: 'select',
        options: authorsAsOptionSelects,
      }
    } else {
      return f
    }
  }) as any

  const configYaml = yaml.dump(cfg)
  await writeFile(path.join('public', 'admin', 'config.yml'), configYaml)
}
