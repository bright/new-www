import React from 'react'
import { Link } from 'gatsby'
import * as Styled from './index.styled'

interface MoreButtonProps {
  href: string
  text?: string
}

export const MoreButton: React.FC<MoreButtonProps> = ({ href, text, children }) => {
  return (
    <Styled.Button className={'column is-full has-text-centered'}>
      <Link to={href}>
        <button>{text || children}</button>
      </Link>
    </Styled.Button>
  )
}

export const HideTablet = Styled.HideTablet
export const Section = Styled.Section
export const SectionTitle = Styled.SectionTitle
