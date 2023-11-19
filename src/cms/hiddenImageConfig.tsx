import { EditorComponentField, EditorComponentOptions, PreviewTemplateComponentProps } from 'netlify-cms-core'
import React from 'react'
import { List, Map } from 'immutable'

function srcFromSourceMarkdownToRelative(src: string | undefined) {
  const updated = (src?.startsWith('/') ? src : src?.replace('../../static', '')) ?? ''
  console.log('srcFromSourceMarkdownToRelative', src , '->', updated)
  return updated;
}

function srcFromPreviewToRelativeInMarkdown(src: string | undefined) {
  return (src?.startsWith('/') ? `../../static${src}` : src) ?? ''
}

interface ImageFieldData {
  src: string
  alt: string
  title?: string
  hideOnMobile?: boolean
}

type EditorComponentFieldOf<T> = EditorComponentField & {
  name: keyof T
}

type EditorComponentOptionsOf<T> = Omit<EditorComponentOptions, 'fields' | 'toBlock' | 'toPreview'> & {
  fields: EditorComponentFieldOf<T>[]
  toBlock(data: T): string
  toPreview(data: T, getAsset: PreviewTemplateComponentProps['getAsset'], fields: List<Map<string, any>>): React.ReactNode
}

export const hiddenImageConfig: EditorComponentOptionsOf<ImageFieldData> = {
  // Internal id of the component
  id: 'image',
  // Visible label
  label: 'Image',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'src',
      label: 'Image',
      widget: 'image',
    },
    {
      name: 'alt',
      label: 'Alt text',
      widget: 'string',
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      name: 'hideOnMobile',
      label: 'Hide on mobile',
      widget: 'boolean',
    },
  ],
  // Regex pattern used to search for instances of this block in the markdown document.
  // Patterns are run in a multline environment (against the entire markdown document),
  // and so generally should make use of the multiline flag (`m`). If you need to capture
  // newlines in your capturing groups, you can either use something like
  // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
  // which will cause `(.*)` to match newlines as well.
  //
  // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
  // `(.*?)` vs `(.*)`), especially if matching against newline characters.
  pattern: /^<div\s+class="(.*?)">\s*!\[(.*?)]\((.*?)\s*("(.*?)")?\)<\/div>$/s,
  // Given a RegExp Match object
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
  // return an object with one property for each field defined in `fields`.
  //
  // This is used to populate the custom widget in the markdown editor in the CMS.
  fromBlock: function (match: any[]) {
    const src: string = match[3]
    return {
      src: srcFromSourceMarkdownToRelative(src),
      alt: match[2],
      title: match[5],
      hideOnMobile: match[1],
    }
  },
  // Given an object with one property for each field defined in `fields`,
  // return the string you wish to be inserted into your markdown.
  //
  // This is used to serialize the data from the custom widget to the
  // markdown document
  toBlock(data: ImageFieldData) {
    const className = data.hideOnMobile ? 'hide-on-mobile' : 'image'
    return `<div class="${className}">![${
      data.alt ?? ''
    }](${srcFromPreviewToRelativeInMarkdown(data.src)} "${data.title ?? ''}")</div>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview(data: ImageFieldData, getAsset, fields) {
    const className = data.hideOnMobile ? 'hide-on-mobile' : 'image'
    // const imageField = fields?.find(f => f?.get('widget') === 'image');
    const src = getAsset(data.src);
    console.log('toPreview', {data, src})
    return (
      <div className={className}>
        <img src={src.toString()} alt={data.alt} title={data.title} />
      </div>
    ) as unknown as string
  },
}
