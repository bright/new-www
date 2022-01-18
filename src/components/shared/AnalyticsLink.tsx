import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import React from 'react'

export default function AnalyticsLink({
  href,
  action,
  category,
  text,
}: {
  href: string
  action: string
  category: string
  text: string
}) {
  const handleClick = () => {
    trackCustomEvent({
      category: category,
      action: action,
      label: window.location.href,
    })
  }

  return (
    <a href={href} onClick={handleClick}>
      {text}
    </a>
  )
}
