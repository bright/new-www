import { siteMetadata } from '../../gatsby-config'
import React from 'react'

export const MetaDescription = ({ description }: { description: string | undefined }) => {
  const descriptionOrDefault = description ?? siteMetadata.description
  return descriptionOrDefault ? <>
    <meta name='description' content={descriptionOrDefault} />
    <meta property='og:description' content={descriptionOrDefault} />
  </> : <></>
}
