import { GatsbyNode } from 'gatsby'
import config, { authorFieldNames, blogCollectionName } from '../../static/admin/config'
import { writeFile } from 'fs/promises'
import path from 'path'
import yaml from 'js-yaml'

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {
  const cfg = { ...(await config()) }

  const authors = await graphql?.<Queries.AboutUsMembersListingQuery>(`
    query ActiveMembers {
      allMembers(filter: { ex: { ne: true } }) {
        nodes {
          name
          author_id
        }
      }
    }
  `)
  // TODO: fix typescript codegen generation
  const allMembers = (authors?.data?.allMembers as unknown) as { nodes: { name: string; author_id: string }[] }
  const members = allMembers?.nodes?.map(({ name, author_id }) => ({ author_id, name }))

  const blog = cfg.collections.find(c => c.name == blogCollectionName)!

  const authorsAsOptionSelects = allMembers?.nodes?.map(({ author_id, name }) => ({
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
