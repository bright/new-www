import React from 'react'
import { resolveFramnaLink } from './redirect-map'

// Anchor used for links authored in MDX content. When the href is covered by the Framna redirection plan (an internal
// path or a mapped external/social URL) it points straight at the framna.com target; otherwise the href is untouched.
export const FramnaMdxLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children, ...rest }) => {
  const target = href ? resolveFramnaLink(href) : null

  return (
    <a href={target ?? href} {...rest}>
      {children}
    </a>
  )
}
