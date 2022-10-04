import fs from 'fs'
import yaml from 'js-yaml'
import * as path from 'path'

interface TagGroupProps {
  name: string,
  slug?: string,
  tags: string[],
  parent?: TagGroup,
  groups: (parent: TagGroup) => TagGroup[]
}

export class TagGroup {
  readonly name: string
  readonly slug: string | undefined
  readonly tags: string[]
  readonly groups: TagGroup[]
  readonly parent: TagGroup | undefined

  constructor({
                name,
                slug,
                tags,
                groups,
                parent
              }: TagGroupProps) {
    this.name = name
    this.tags = tags
    this.slug = slug
    this.parent = parent
    this.groups = groups(this)
  }

  get tagsTreeFlat(): string[] {
    const allTags = this.tags.concat(this.groups.flatMap(group => group.tagsTreeFlat))
    return Array.from(new Set(allTags))
  }

  get allGroupsIncludingSelf(): TagGroup[] {
    const self = [this] as TagGroup[]
    return self.concat(this.groups.flatMap(group => group.allGroupsIncludingSelf))
  }

  get ancestorsIncludingSelf(): TagGroup[] {
    const self = [this] as TagGroup[]
    return (this?.parent?.ancestorsIncludingSelf ?? []).concat(self)
  }
}

interface RawGroup {
  name: string
  slug?: string
  groups?: RawGroup[]
  tags: string[]
}

function toGroup(rawGroup: RawGroup, parent?: TagGroup): TagGroup {
  return new TagGroup({
    name: rawGroup.name,
    slug: rawGroup.slug,
    tags: rawGroup.tags,
    parent: parent,
    groups: (parent) => rawGroup?.groups?.map(rawSubGroup => toGroup(rawSubGroup, parent)) ?? []
  })
}

function parseTagGroupsYaml(tagGroupsContent: string) {
  const { groups } = yaml.load(tagGroupsContent) as { groups: RawGroup[] }
  const topLevelGroups = groups.map(rawGroup => toGroup(rawGroup))
  return {
    groups: topLevelGroups,
    allGroups: topLevelGroups.flatMap(group => group.allGroupsIncludingSelf)
  }
}

function tagGroupsFilePath() {
  return path.join(process.cwd(), 'tag-groups.yml')
}

type TagGroupsContent = {
  groups: TagGroup[],
  allGroups: TagGroup[]
}

export async function loadTagGroups(): Promise<TagGroupsContent> {
  const tagGroupsContent = await fs.promises.readFile(tagGroupsFilePath(), 'utf-8')
  return parseTagGroupsYaml(tagGroupsContent)
}

export function loadTagGroupsSync(): TagGroupsContent {
  const tagGroupsContent = fs.readFileSync(tagGroupsFilePath(), 'utf-8')
  return parseTagGroupsYaml(tagGroupsContent)
}
