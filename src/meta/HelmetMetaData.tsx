import React, { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet'
import { siteTitle } from './site-title'
import { descriptionOrDefault } from './meta-description'
import { getSrc, ImageDataLike } from 'gatsby-plugin-image'
import { siteMetadata } from '../site-metadata'
import { resolveUrl } from './resolve-url'

interface HelmetMetaDataProps {
  title: string
  description?: string
  url?: string
  type?: string
  image?: ImageDataLike
  canonicalUrl?: string
  alt?: string
}

const htmlAttributes = { lang: 'en' }

export const HelmetMetaData: React.FC<PropsWithChildren<HelmetMetaDataProps>> = ({
  title,
  description,
  url,
  type,
  image,
  alt,
  canonicalUrl,
  children: additionalMeta,
}) => {
  return (
    // please note that Helmet does not support nesting higher order components like so
    // <Helmet><MetaTitle title={whatever}></Helmet>
    <Helmet defaultTitle={siteTitle} htmlAttributes={htmlAttributes}>
      <title>{title} | Bright Inventions</title>
      {title && <meta property='og:title' content={title} />}
      <meta name='description' content={descriptionOrDefault(description)} />
      <meta property='og:description' content={descriptionOrDefault(description)} />
      <meta property='og:site_name' content={siteMetadata.title} />
      {url && <meta property='og:url' content={resolveUrl(url)} />}
      {type && <meta property='og:type' content={type} />}
      {image && <meta property='og:image' content={resolveUrl(getSrc(image)!)} />}
      {alt && <meta property='og:image:alt' content={alt} />}
      {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}
      {additionalMeta}
    </Helmet>
  )
}
