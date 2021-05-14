import Helmet from 'react-helmet'
import React from 'react'

export const MetaImage = ({ imageUrl }: { imageUrl: string | undefined }) => {
  return imageUrl ? <meta property='og:image' content={imageUrl} /> : <></>
}

export const HelmetMetaImage = ({ imageUrl }: { imageUrl: string | undefined }) => {
  return imageUrl ? (<></>) : <Helmet>
    <MetaImage imageUrl={imageUrl} />
  </Helmet>
}
