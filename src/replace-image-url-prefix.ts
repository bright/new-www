import { Plugin } from 'unified'
import {visit} from 'unist-util-visit'

export const replaceImageUrlPrefix: Plugin<[{ prefix: string }]> = ({ prefix }) => {
  return function (tree) {
    visit(tree, 'image', (node) => {
      const image = node as {url?: string}
      if(image.url?.startsWith(prefix)){
        image.url = image.url?.replace(prefix, "")
      }
    })
  }
}
