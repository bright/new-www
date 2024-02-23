import type { FileCdnUrlGeneratorFn, FileCdnSourceImage } from "gatsby"

export const generateFileUrl: FileCdnUrlGeneratorFn = function generateFileUrl(
  source: FileCdnSourceImage,
  pathPrefix: string
): string {
  return 'FILE_PATH_MOCK';
}

export default generateFileUrl