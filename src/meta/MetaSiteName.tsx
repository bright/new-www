import { siteMetadata } from '../../gatsby-config'
import React from 'react'

export const MetaSiteName = () => {
  return <meta property='og:site_name' content={siteMetadata.title} />
}
