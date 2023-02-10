import { EditorComponentOptions } from 'netlify-cms-core'

export const TwitterEmbedCmsEditorComponent: EditorComponentOptions = {
  id: 'TwitterEmbed',
  fields: [
    {
      name: 'url',
      label: 'url',
      widget: 'string',
    },
  ],
  label: 'Twitter',
  // <TwitterEmbed url="https://twitter.com/sundarpichai/status/1622674382069059591" />
  pattern: /^\s*<TwitterEmbed\s+url=['"](.*?)['"]\s*\/>\s*$/,
  fromBlock(match: RegExpMatchArray) {
    return {
      url: match[1],
    }
  },
  toBlock(props: { url: string }) {
    return `<TwitterEmbed url='${props.url}' />`
  },
  toPreview(props: { url: string }) {
    return this.toBlock(props)
  },
}
