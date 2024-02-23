import { AdapterInit } from 'gatsby'
import path from 'path'

const createAdapterFoo: AdapterInit = () => {
  return {
    name: `bi-gatsby-adapter`,
    async adapt(): Promise<void> {},
    config() {
      return {
        imageCDNUrlGeneratorModulePath: path.resolve(`./image-cdn-url-generator.ts`),
        fileCDNUrlGeneratorModulePath: path.resolve(`./file-cdn-url-generator.ts`),
      }
    },
  }
}

export default createAdapterFoo