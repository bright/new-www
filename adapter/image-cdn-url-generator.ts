import type {
  ImageCdnUrlGeneratorFn,
  ImageCdnSourceImage,
  ImageCdnTransformArgs,
} from "gatsby"

export const generateImageUrl: ImageCdnUrlGeneratorFn =
  function generateImageUrl(
    source: ImageCdnSourceImage,
    imageArgs: ImageCdnTransformArgs,
  ): string {

    console.log('GENERATE IMAGE URL');

    return 'CDN_URL_MOCK';
  }

export default generateImageUrl