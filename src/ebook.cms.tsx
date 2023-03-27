import { ebookNames } from './ebook-names'

export const EbookCmsEditorComponent = {
  id: 'EbookDynamic',
  fields: [
    {
      name: 'section_title',
      label: 'Section Title',
      widget: 'string',
    },
    {
      name: 'ebook_name',
      label: 'Ebook name',
      widget: 'select',
      options: ebookNames,
    },
    {
      name: 'ebook_description',
      label: 'Ebook Description',
      widget: 'string',
    },
    {
      name: 'ebook_url',
      label: 'Ebook Url',
      widget: 'string',
    },
    {
      name: 'ebook_alt',
      label: 'Ebook Image Alt',
      widget: 'string',
    },
    {
      name: 'ebook_image',
      label: 'Ebook Image',
      widget: 'image',
    },
  ],
  label: 'Ebook',

  pattern: /^\s*<EbookDynamic\s+section_title=['"](.*?)['"]\s+ebook_name=['"](.*?)['"]\s+ebook_description=['"](.*?)['"]\s+ebook_image=['"](.*?)['"]\s+ebook_alt=['"](.*?)['"]\s+ebook_url=['"](.*?)['"]\s*\/>\s*$/,

  fromBlock(match: RegExpMatchArray) {
    return {
      section_title: match[1],
      ebook_name: match[2],
      ebook_description: match[3],
      ebook_url: match[4],
      ebook_image: match[5],
      ebook_alt: match[6],
    }
  },
  toBlock(props: {
    section_title: string
    ebook_name: string
    ebook_description: string
    ebook_url: string
    ebook_image: string
    ebook_alt: string
  }) {
    return `<EbookDynamic section_title='${props.section_title}' ebook_name='${props.ebook_name}' ebook_description='${props.ebook_description}'  ebook_url='${props.ebook_url}'  ebook_image='${props.ebook_image}' ebook_alt='${props.ebook_alt}' />`
  },
  toPreview(props: {
    section_title: string
    ebook_name: string
    ebook_description: string
    ebook_url: string
    ebook_image: string
    ebook_alt: string
  }) {
    return this.toBlock(props)
  },
}
