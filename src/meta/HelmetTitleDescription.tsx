import React from 'react'
import { Helmet } from 'react-helmet'
import { siteTitle } from './site-title'
import { descriptionOrDefault } from './meta-description'

interface HelmetTitleDescriptionProps {
  title: string
  description?: string
  children?: React.ReactChild | React.ReactChild[]
}

const htmlAttributes = { lang: 'en' }

export const HelmetTitleDescription: React.FC<HelmetTitleDescriptionProps> = ({ title, description, children }) => {
  return (
    // please note that Helmet does not support nesting higher order components like so
    // <Helmet><MetaTitle title={whatever}></Helmet>
    <Helmet defaultTitle={siteTitle} htmlAttributes={htmlAttributes}>
      <title>{title} | Bright Inventions</title>
      {title && <meta property='og:title' content={title} />}
      <meta name='description' content={descriptionOrDefault(description)} />
      <meta property='og:description' content={descriptionOrDefault(description)} />
      {children}
    </Helmet>
  )
}
