import { DefaultApi } from './apis'
import { isProduction } from '../src/helpers/deployEnv'
import { Configuration, DefaultConfig } from './runtime'
import { stagingSiteUrl } from '../src/site-metadata'

const apiConfig = isProduction
  ? DefaultConfig
  : new Configuration({
      basePath: new URL('/api', stagingSiteUrl).toString(),
    })

const apiClient = new DefaultApi(apiConfig)
