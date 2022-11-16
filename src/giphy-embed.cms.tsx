import { EditorComponentOptions } from 'netlify-cms-core'

export const GiphyEmbedCmsEditorComponent: EditorComponentOptions = {
  id: 'GiphyEmbed',
  fields: [
    {
      name: 'url',
      label: 'url',
      widget: 'string',
    },
  ],
  label: 'Giphy',
  // // <GiphyEmbed url='https://giphy.com/gifs/garyvee-motivation-balance-3o6Zt14FoFHzswxPmE' />
  pattern: /^\s*<GiphyEmbed\s+url=['"](.*?)['"]\s*\/>\s*$/,
  fromBlock(match: RegExpMatchArray) {
    return {
      url: match[1],
    }
  },
  toBlock(props: { url: string }) {
    return `<GiphyEmbed url='${props.url}' />`
  },
  toPreview(props: { url: string }) {
    return this.toBlock(props)
  },
}
