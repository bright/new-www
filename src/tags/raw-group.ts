export interface RawGroup {
  name: string
  slug?: string
  groups?: RawGroup[]
  tags: string[]
  aliases?: string[]
}
