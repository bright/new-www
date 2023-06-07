import { EditorComponentOptions } from 'netlify-cms-core'
export const TitleWithIconCmsEditorComponent: EditorComponentOptions = {
  id: 'TitleWithIcon',
  fields: [
    {
      name: 'sectionTitle',
      label: 'Section Title',
      widget: 'string',
    },
    {
      name: 'titleIconAlt',
      label: 'Title Icon Alt',
      widget: 'string',
    },
    {
      name: 'titleIcon',
      label: 'Title Icon',
      widget: 'image',
    },
  ],
  label: 'Title',

  pattern: /^\s*<TitleWithIcon\s+sectionTitle=['"](.*?)['"]\s+titleIcon=['"](.*?)['"]\s+titleIconAlt=['"](.*?)['"]\s*\/>\s*$/,

  fromBlock(match: RegExpMatchArray) {
    return {
      sectionTitle: match[1],
      titleIcon: match[2],
      titleIconAlt: match[3],  
    }
  },
  toBlock(props: {
    sectionTitle: string
    titleIcon: string
    titleIconAlt: string  
  }) {
    return `<TitleWithIcon sectionTitle='${props.sectionTitle}' titleIcon='${props.titleIcon}' titleIconAlt='${props.titleIconAlt}' />`
  },
  toPreview(props: {
    sectionTitle: string
    titleIcon: string
    titleIconAlt: string
  }) {
    return TitleWithIconCmsEditorComponent.toBlock(props)
  },
}