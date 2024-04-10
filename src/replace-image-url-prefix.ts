import { Plugin } from 'unified'
import {visit} from 'unist-util-visit'
import { GetAssetFunction } from './cms/mdx-preview'

export const replaceImageUrlPrefix: Plugin<[{ prefix: string, getAsset: GetAssetFunction }]> = ({ prefix, getAsset }) => {
  return function (tree) {
    visit(tree, 'image', (node) => {
      const image = node as {url?: string}
      // if(image.url?.startsWith(prefix)){
      //   image.url = image.url?.replace(prefix, "")
      // }

      image.url = image.url ? getAsset(image.url).url : ''
    })
  }
}
