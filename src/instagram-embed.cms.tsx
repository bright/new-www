import { EditorComponentOptions } from 'netlify-cms-core'

export const InstagramEmbedCmsEditorComponent: EditorComponentOptions = {
  id: 'InstagramEmbed',
  fields: [
    {
      name: 'url',
      label: 'url',
      widget: 'string',
    },
  ],
  label: 'Instagram',
  // <InstagramEmbed url="https://www.instagram.com/p/CSpCokcIxnH/" />
  pattern: /^\s*<InstagramEmbed\s+url=['"](.*?)['"]\s*\/>\s*$/,
  fromBlock(match: RegExpMatchArray) {
    return {
      url: match[1],
    }
  },
  toBlock(props: { url: string }) {
    return `<InstagramEmbed url='${props.url}' />`
  },
  toPreview(props: { url: string }) {
    return this.toBlock(props)
  },
}
