import { resolveUrl } from './resolve-url'
import React from 'react'

export const MetaOgUrl = ({ path }: { path: string }) => {
  return <meta property='og:url' content={resolveUrl(path)} />
}
