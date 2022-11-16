import { GatsbyNode } from 'gatsby'
import * as util from 'util'
import { RuleSetRule } from 'webpack'
import { PartialWebpackConfig } from '../../src/partial-webpack-config'
import path from 'path'

const _cssLoaderModulePath = path.resolve(process.cwd(), 'node_modules', 'css-loader')
const isCssLoaderPath = (path: string | undefined) => path?.startsWith(_cssLoaderModulePath) ?? false

const dtsCssModulesLoader = path.resolve(process.cwd(), 'node_modules', 'dts-css-modules-loader', 'index.js')

function addDtsToCssLoader(use: RuleSetRule['use']): RuleSetRule['use'] {
  // TODO: add handling of non array
  return Array.isArray(use)
    ? use
        .map(useItem => {
          if (typeof useItem === 'undefined' || typeof useItem === 'function' || typeof useItem === 'string') {
            return useItem
          }
          if (!isCssLoaderPath(useItem.loader)) {
            return useItem
          }

          return [
            {
              loader: dtsCssModulesLoader,
              options: {
                namedExport: true,
              },
            },
            useItem,
          ]
        })
        .flat()
    : use
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  getConfig,
  actions: { replaceWebpackConfig },
}) => {
  if (stage !== 'develop' && stage !== 'develop-html') {
    return
  }

  const config: PartialWebpackConfig = getConfig()
  const mappedRules = config.module?.rules?.map(rule => {
    if (typeof rule === 'string') {
      return rule
    }

    if (rule.oneOf) {
      return {
        ...rule,
        oneOf: rule.oneOf.map(set => {
          return {
            ...set,
            use: addDtsToCssLoader(set.use),
          }
        }),
      }
    }

    if (rule.use) {
      return {
        ...rule,
        use: addDtsToCssLoader(rule.use),
      }
    }

    return rule
  })

  // console.log(util.inspect(mappedRules, { depth: 5 }))

  const newVar: PartialWebpackConfig = {
    ...config,
    module: {
      ...config.module,
      rules: mappedRules,
    },
  }

  replaceWebpackConfig(newVar)
}
