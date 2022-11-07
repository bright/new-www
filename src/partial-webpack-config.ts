import type { config } from 'webpack'

export type PartialWebpackConfig = Partial<Parameters<typeof config.getNormalizedWebpackOptions>[0]>
