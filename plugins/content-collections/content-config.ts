import path from 'path'
import { NodeInput } from 'gatsby'
import { readFile } from 'fs/promises'
import yaml from 'js-yaml'

export class ContentCollection {
  name: string
  label: string
  folder: string
  fields: ContentField[]
  private folderFullPath: string

  constructor({
    name,
    label,
    folder,
    fields,
  }: {
    name: string
    label: string
    folder: string
    fields: ContentField[]
  }) {
    this.name = name
    this.label = label
    this.folder = folder
    this.folderFullPath = path.resolve(path.join(process.cwd(), folder))
    this.fields = fields
  }

  isCollectionItem(node: NodeInput) {
    return node.internal?.contentFilePath?.startsWith(this.folderFullPath) ?? false
  }
}

export interface ContentField {
  label: string
  name: string
  widget: 'relation' | 'tags' | 'datetime' | 'mdx' | 'string' | 'boolean' | string
  collection: string
  multiple?: boolean
  valueField: string
  required?: boolean
}

interface ContentConfig {
  collections: ContentCollection[]
}

let _contentConfig: ContentConfig | null = null

async function loadContentConfig(): Promise<ContentConfig> {
  const configYmlContent = await readFile(path.join(process.cwd(), 'static', 'admin', 'config.yml'), 'utf-8')
  const contentConfig: ContentConfig = yaml.load(configYmlContent) as any
  contentConfig.collections = contentConfig.collections.map(col => new ContentCollection(col))
  return contentConfig
}

export async function contentConfig() {
  if (!_contentConfig) {
    _contentConfig = await loadContentConfig()
  }
  return _contentConfig
}
