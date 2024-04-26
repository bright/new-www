import { descriptionOrDefault } from './meta-description'
import { siteMetadata } from '../site-metadata'
import { resolveUrl } from './resolve-url'
import { getSrc, ImageDataLike } from 'gatsby-plugin-image'
import { fbShareImage } from './bright-logo'
import React from 'react'
import { useLocation } from '@reach/router'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title: string
  description?: string
  twitterType?: string
  type?: string
  image?: ImageDataLike
  alt?: string
  canonicalUrl?: string
  children?: React.ReactNode
}
export const SEO = ({ title, description, twitterType, type, image, alt, canonicalUrl, children }: SEOProps) => {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()

  return (
    <>
      <html lang={i18n.language} />

      <title>{title} | Bright Inventions</title>
      <meta name='description' content={descriptionOrDefault(description)} />

      {twitterType && <meta name='twitter:card' content={twitterType} />}

      <meta property='og:title' content={title} />
      <meta property='og:description' content={descriptionOrDefault(description)} />
      <meta property='og:site_name' content={siteMetadata.title} />
      <meta property='og:url' content={resolveUrl(pathname)} />
      {type ? <meta property='og:type' content={type} /> : <meta property='og:type' content='website' />}

      {image ? (
        <meta property='og:image' content={resolveUrl(getSrc(image)!)} />
      ) : (
        <meta property='og:image' content={resolveUrl(fbShareImage)} />
      )}
      {alt ? (
        <meta property='og:image:alt' content={alt} />
      ) : (
        <meta property='og:image:alt' content='Bright Inventions' />
      )}
      {canonicalUrl && <link key='canonical' rel='canonical' href={canonicalUrl} />}

      {children}
    </>
  )
}