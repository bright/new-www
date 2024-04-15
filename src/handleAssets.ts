import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { GetAssetFunction } from './cms/mdx-preview'

export const handleAssets: Plugin<[{ prefix: string, getAsset: GetAssetFunction }]> = ({ getAsset }) => {
  return function(tree) {
    visit(tree, 'image', (node) => {
      const image = node as { url?: string }

      image.url = image.url ? getAsset(image.url).url : ''
    })
  }
}
