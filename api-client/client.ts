import { DefaultApi } from './apis'
import { isProduction } from '../src/helpers/deployEnv'
import { Configuration, DefaultConfig } from './runtime'
const currentLocationUrl = window.location.origin

const apiConfig = isProduction
  ? DefaultConfig
  : new Configuration({
      basePath: new URL('/api', currentLocationUrl).toString(),
    })

export const apiClient = new DefaultApi(apiConfig)
