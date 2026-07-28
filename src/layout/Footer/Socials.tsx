import { ExaggeratedLink, SocialsWrapper } from './Footer.styled'
import React from 'react'
import { FRAMNA_URLS } from '../../framna-redirects'

export const Socials = () => {
  return <SocialsWrapper>
    <ExaggeratedLink href='https://www.facebook.com/framnastudios/' target="_blank">
      facebook
    </ExaggeratedLink>
    <ExaggeratedLink href={FRAMNA_URLS.about} target="_blank">
      X
    </ExaggeratedLink>
    <ExaggeratedLink href='https://www.linkedin.com/company/framna/' target="_blank">
      linkedin
    </ExaggeratedLink>
    <ExaggeratedLink href='https://www.instagram.com/framnastudios/?hl=en' target="_blank">
      instagram
    </ExaggeratedLink>
    <ExaggeratedLink href={FRAMNA_URLS.about} target="_blank">
      github
    </ExaggeratedLink>
    <ExaggeratedLink href={FRAMNA_URLS.about} target="_blank">
      apple podcast
    </ExaggeratedLink>
    <ExaggeratedLink href={FRAMNA_URLS.about} target="_blank">
      spotify
    </ExaggeratedLink>
    <ExaggeratedLink href='https://www.youtube.com/@Framna' target="_blank">
      youtube
    </ExaggeratedLink>
    <ExaggeratedLink href={FRAMNA_URLS.about} target="_blank">
      behance
    </ExaggeratedLink>
    <ExaggeratedLink href={FRAMNA_URLS.about} target="_blank">
      dribbble
    </ExaggeratedLink>
  </SocialsWrapper>
}