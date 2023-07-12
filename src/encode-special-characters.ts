export const encodeSpecialCharacters = (str: string): string => {
  const charMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '%': '&#37;',
  }

  return str.replace(/[&<>"'`=\/%]/g, s => {
    return charMap[s]
  })
}
