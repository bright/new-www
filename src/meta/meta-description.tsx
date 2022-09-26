import React from 'react'
import { siteMetadata } from '../site-metadata'

export function descriptionOrDefault(description: string | undefined){
  return description ?? siteMetadata.description
}
