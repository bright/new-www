import { DefaultApi } from './apis'
import { isProduction } from '../src/helpers/deployEnv'
import { Configuration, DefaultConfig } from './runtime'
import { isBrowser } from './../src/utils'
import { siteUrl } from './../src/site-metadata'

const callUrl = isBrowser() ? window.location.origin : siteUrl

const apiConfig = isProduction
  ? DefaultConfig
  : new Configuration({
      basePath: new URL('/api', callUrl).toString(),
    })

export const apiClient = new DefaultApi(apiConfig)
