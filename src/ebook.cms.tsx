import { ebookNames } from './ebook-names'

export const EbookCmsEditorComponent = {
  id: 'EbookDynamic',
  fields: [
    {
      name: 'sectionTitle',
      label: 'Section Title',
      widget: 'string',
    },
    {
      name: 'ebookName',
      label: 'Ebook name',
      widget: 'select',
      options: ebookNames,
    },
    {
      name: 'ebookDescription',
      label: 'Ebook Description',
      widget: 'string',
    },
    {
      name: 'ebookAlt',
      label: 'Ebook Image Alt',
      widget: 'string',
    },
    {
      name: 'ebookImage',
      label: 'Ebook Image',
      widget: 'image',
    },
  ],
  label: 'Ebook',

  pattern: /^\s*<EbookDynamic\s+sectionTitle=['"](.*?)['"]\s+ebookName=['"](.*?)['"]\s+ebookDescription={'(.*?)'}\s+ebookImage=['"](.*?)['"]\s+ebookAlt=['"](.*?)['"]\s*\/>\s*$/,

  fromBlock(match: RegExpMatchArray) {
    return {
      sectionTitle: match[1],
      ebookName: match[2],
      ebookDescription: match[3].replaceAll("\\'", "'"),
      ebookImage: match[4],
      ebookAlt: match[5],
    }
  },
  toBlock(props: {
    sectionTitle: string
    ebookName: string
    ebookDescription: string
    ebookImage: string
    ebookAlt: string
  }) {
    return `<EbookDynamic sectionTitle='${props.sectionTitle}' ebookName='${props.ebookName}' ebookDescription={'${props.ebookDescription.replaceAll("'", "\\'")}'} ebookImage='${props.ebookImage}' ebookAlt='${props.ebookAlt}' />`
  },
  toPreview(props: {
    sectionTitle: string
    ebookName: string
    ebookDescription: string
    ebookImage: string
    ebookAlt: string
  }) {
    return this.toBlock(props)
  },
}
