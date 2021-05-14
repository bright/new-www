import { siteMetadata } from '../../gatsby-config'
import React from 'react'

export function descriptionOrDefault(description: string | undefined){
  return description ?? siteMetadata.description
}
