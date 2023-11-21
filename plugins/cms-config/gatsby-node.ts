import { GatsbyNode } from 'gatsby'
import config from '../../static/admin/config'
import { writeFile } from 'fs/promises'
import path from 'path'
import yaml from 'js-yaml'

export const onPostBuild: GatsbyNode['onPostBuild'] = async () => {
  const cfg = await config()
  const configYaml = yaml.dump(cfg)
  await writeFile(path.join('public', 'admin', 'config.yml'), configYaml)
}
