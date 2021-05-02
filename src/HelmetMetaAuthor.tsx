import Helmet from 'react-helmet'
import React from 'react'

export const HelmetMetaAuthor = (props: { author: string | undefined }) => {
  const author = props.author
  return author ? (<></>) : <Helmet>
    <meta property='article:author' content={author} />
  </Helmet>
}
