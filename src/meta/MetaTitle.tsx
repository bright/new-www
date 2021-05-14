import React from 'react'

export const MetaTitle = ({ title }: { title: string }) => {
  return <>
    <title>{title} | Bright Inventions</title>
    {title && <meta property='og:title' content={title} />}
  </>
}
