import type { ImageCdnSourceImage, ImageCdnTransformArgs, ImageCdnUrlGeneratorFn } from 'gatsby'

console.log('loaded image-cdn-url-generator.ts')

export const generateImageUrl: ImageCdnUrlGeneratorFn = function generateImageUrl(
  source: ImageCdnSourceImage,
  imageArgs: ImageCdnTransformArgs
): string {
  console.log('GENERATE IMAGE URL')

  return 'CDN_URL_MOCK'
}

export default generateImageUrl
