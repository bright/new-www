export const importantInfoConfig = {
  id: 'important_info', // Internal id of the component
  label: 'Important Info', // Visible label
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
  ],
  pattern: /^<div><h2>(.*)<\/h2><div>(.*)<\/div><\/div>$/, // Pattern to identify a block as being an instance of this component
  // Function to extract data elements from the regexp match
  fromBlock: function (match: any[]) {
    return {
      title: match[1],
      text: match[2],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj: { title: string; text: string }) {
    return '<div class="important-info">' + '<h2>' + obj.title + '</h2>' + '<div>' + obj.text + '</div>' + '</div>'
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj: { title: string; text: string }) {
    return '<div class="important-info">' + '<h2>' + obj.title + '</h2>' + '<div>' + obj.text + '</div>' + '</div>'
  },
}
