import { AdapterInit, IAdapterConfig } from 'gatsby'
import path from 'path'

export const adapter: AdapterInit = () => {
  return {
    name: `bi-gatsby-adapter`,
    async adapt(): Promise<void> {},
    config({ reporter }) {
      const imageCDNUrlGeneratorModulePath = path.resolve(`./adapter/image-cdn-url-generator.js`)
      console.log(imageCDNUrlGeneratorModulePath)
      const config: IAdapterConfig = {
        imageCDNUrlGeneratorModulePath: imageCDNUrlGeneratorModulePath,
        fileCDNUrlGeneratorModulePath: path.resolve(`./adapter/file-cdn-url-generator.js`),
      }
      return config
    },
  }
}
