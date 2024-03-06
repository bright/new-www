export const quoteConfig = {
  id: 'blockquote', // Internal id of the component
  label: 'Block Quote', // Visible label
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
    },
    {
      name: 'quote',
      label: 'Quote',
      widget: 'string',
    },
    {
      name: 'author',
      label: 'Author',
      widget: 'string',
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<blockquote>\s*(?:<h2>(.*)<\/h2>)?\s*<div>(.*)<\/div>\s*(?:<footer>(.*)<\/footer>)?\s*<\/blockquote>\s*$/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match: any[]) {
    return {
      title: match[1],
      quote: match[2],
      author: match[3],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj: { title: string; quote: string; author: string }) {
    return (
      '<blockquote>' +
      '<h2>' +
      (obj.title ?? '') +
      '</h2>' +
      '<div>' +
      obj.quote +
      '</div>' +
      '<footer>' +
      (obj.author ?? '') +
      '</footer>' +
      '</blockquote>'
    )
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj: { title: string; quote: string; author: string }) {
    return (
      '<blockquote>' +
      '<h2>' +
      (obj.title ?? '') +
      '</h2>' +
      '<div>' +
      obj.quote +
      '</div>' +
      '<footer>' +
      (obj.author ?? '') +
      '</footer>' +
      '</blockquote>'
    )
  },
}
