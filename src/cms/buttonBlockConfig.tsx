export const buttonBlockConfig = {
  id: 'blockButton', // Internal id of the component
  label: 'Block Button', // Visible label
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
    },
    {
      name: 'text',
      label: 'Text',
      widget: 'string',
    },
    {
      name: 'link',
      label: 'Link',
      widget: 'string',
    },
    {
      name: 'button',
      label: 'Button name',
      widget: 'string',
    },
  ],
  pattern: /^<div><h2>(.*)<\/h2><div>(.*)<\/div><a href=(.*)><button>(.*)<\/button><\/a><\/div>$/, // Pattern to identify a block as being an instance of this component
  // Function to extract data elements from the regexp match
  fromBlock: function (match: any[]) {
    return {
      title: match[1],
      text: match[2],
      link: match[3],
      button: match[4],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj: { title: string; text: string; link: any; button: string }) {
    return (
      "<div class='block-button'>" +
      '<h2>' +
      obj.title +
      '</h2>' +
      '<div>' +
      obj.text +
      '</div>' +
      `<a href="${obj.link}">` +
      '<button>' +
      +obj.button +
      '</button>' +
      '</a>' +
      '</div>'
    )
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj: { title: string; text: string; button: string; link: any }) {
    return (
      "<div class='block-button'>" +
      '<h2>' +
      obj.title +
      '</h2>' +
      '<div>' +
      obj.text +
      '</div>' +
      `<a href="${obj.link}">` +
      '<button>' +
      +obj.button +
      '</button>' +
      '</a>' +
      '</div>'
    )
  },
}
