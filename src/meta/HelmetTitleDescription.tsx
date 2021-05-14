import React from 'react'
import { Helmet } from 'react-helmet'
import { MetaTitle } from './MetaTitle'
import { MetaDescription } from './MetaDescription'

interface HelmetTitleDescriptionProps {
  title: string
  description?: string
}

export const HelmetTitleDescription: React.FC<HelmetTitleDescriptionProps> = props => {
  return (
    <Helmet>
      <MetaTitle title={props.title} />
      <MetaDescription description={props.description} />
    </Helmet>
  )
}
