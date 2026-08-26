import { ExaggeratedLink, SocialsWrapper } from './Footer.styled'
import React from 'react'
import { resolveFramnaExternal } from '../../framna/redirect-map'

const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: 'facebook', href: 'https://www.facebook.com/Bright.Inventions/' },
  { label: 'X', href: 'https://x.com/BrightDevs' },
  { label: 'linkedin', href: 'https://www.linkedin.com/company/bright-inventions/' },
  { label: 'instagram', href: 'https://www.instagram.com/bright_inventions/' },
  { label: 'github', href: 'https://github.com/bright' },
  { label: 'apple podcast', href: 'https://podcasts.apple.com/us/podcast/brightdevtalks/id1625829267' },
  { label: 'spotify', href: 'https://open.spotify.com/show/1xrG8BF4Niv5uIzHvIn79q' },
  { label: 'youtube', href: 'https://www.youtube.com/channel/UCWNKNRKF_kzgGZnrzlQ7wvA' },
  { label: 'behance', href: 'https://www.behance.net/BrightInventions/' },
  { label: 'dribbble', href: 'https://dribbble.com/Bright_Inventions/' },
]

export const Socials = () => {
  return (
    <SocialsWrapper>
      {SOCIAL_LINKS.map(({ label, href }) => (
        <ExaggeratedLink key={label} href={resolveFramnaExternal(href) ?? href} target='_blank'>
          {label}
        </ExaggeratedLink>
      ))}
    </SocialsWrapper>
  )
}
