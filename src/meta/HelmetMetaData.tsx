import React, { PropsWithChildren } from 'react'
import { Helmet, HelmetProps } from 'react-helmet'
import { siteTitle } from './site-title'
import { descriptionOrDefault } from './meta-description'
import { getSrc, ImageDataLike } from 'gatsby-plugin-image'
import { siteMetadata } from '../site-metadata'
import { resolveUrl } from './resolve-url'
import { fbShareImage } from './bright-logo'

interface HelmetMetaDataProps {
  title: string
  description?: string
  url?: string
  type?: string
  image?: ImageDataLike
  canonicalUrl?: string
  twitterType?: string
  alt?: string
  language?: string
}

export const HelmetMetaData: React.FC<PropsWithChildren<HelmetMetaDataProps>> = ({
  title,
  description,
  url,
  type,
  image,
  alt,
  canonicalUrl,
  twitterType,
  language,
  children: additionalMeta,
}) => {
  // we don't want an empty language reset previously configured value
  // ideally we'd only have one Helmet invocation per page
  // but at the moment we don't ;/
  const otherProps: HelmetProps = {
    ...(language ? { htmlAttributes: { lang: language } } : {}),
  }

  return (
    // please note that Helmet does not support nesting higher order components like so
    // <Helmet><MetaTitle title={whatever}></Helmet>
    <Helmet defaultTitle={siteTitle} {...otherProps}>
      <title>{title} | Bright Inventions</title>
      {title && <meta property='og:title' content={title} />}
      <meta name='description' content={descriptionOrDefault(description)} />
      {twitterType && <meta name='twitter:card' content={twitterType} />}
      <meta property='og:description' content={descriptionOrDefault(description)} />
      <meta property='og:site_name' content={siteMetadata.title} />
      {url && <meta property='og:url' content={resolveUrl(url)} />}
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
      {additionalMeta}
    </Helmet>
  )
}
