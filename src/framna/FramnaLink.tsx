import React from 'react'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import { resolveFramnaLink } from './redirect-map'

// Drop-in replacement for Gatsby's Link. When the destination is covered by the Framna redirection plan it renders a
// plain anchor to the framna.com target (a full navigation, since the local page no longer exists); otherwise it is an
// ordinary client-side Gatsby Link, so behaviour for non-covered destinations is unchanged.
export const FramnaLink = React.forwardRef<HTMLAnchorElement, GatsbyLinkProps<unknown>>((props, ref) => {
  const target = resolveFramnaLink(props.to)
  const { ref: _ignoredRef, ...linkProps } = props as GatsbyLinkProps<unknown> & { ref?: unknown }

  if (target) {
    const { to, activeClassName, activeStyle, partiallyActive, getProps, replace, state, ...anchorProps } =
      linkProps as typeof linkProps & { getProps?: unknown; replace?: unknown; state?: unknown }

    return <a ref={ref} href={target} {...anchorProps} />
  }

  return <GatsbyLink {...linkProps} />
})

FramnaLink.displayName = 'FramnaLink'
