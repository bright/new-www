export function ebookBasename(name: string) {
  return name.replace(/\.\w+$/, '')
}
