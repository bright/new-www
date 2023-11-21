import path from 'path'
import { NodeInput } from 'gatsby'
import config from '../../static/admin/config'

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

export async function contentConfig() {
  const cfg = (await config()) as any
  const contentConfig: ContentConfig = { ...cfg }
  contentConfig.collections = contentConfig.collections.map(col => new ContentCollection(col))
  return contentConfig
}
