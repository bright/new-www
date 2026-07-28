import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { resolveSpecificRedirect } from '../../framna-redirects'

type Props = React.ComponentProps<typeof GatsbyLink>

/**
 * Drop-in replacement for gatsby's `Link`. Renders a real external anchor to
 * the Framna equivalent when `to` matches one of the mapping doc's specific
 * redirect rows, otherwise delegates to the real gatsby `Link` unchanged.
 */
export const Link = (props: Props) => {
  const { to, className, style, id, children, onClick } = props
  const target = to ? resolveSpecificRedirect(to) : null

  if (target) {
    return (
      <a href={target} className={className} style={style} id={id} onClick={onClick}>
        {children}
      </a>
    )
  }

  return <GatsbyLink {...props} />
}
