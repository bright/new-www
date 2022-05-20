import React from 'react'
import { Link } from 'gatsby'
import * as Styled from './index.styled'

interface MoreButtonProps {
  onClick?: (e: MouseEvent) => void
  href?: string
  text?: string
  isSubmit?: boolean
  disabled?: boolean
  className?: string
}

export const MoreButton: React.FC<MoreButtonProps> = ({
  onClick,
  href,
  text,
  disabled,
  isSubmit,
  children,
  className,
}) => {
  const Btn = () => (
    <button type={isSubmit ? 'submit' : 'button'} disabled={disabled} onClick={onClick} className={className}>
      {text || children}
    </button>
  )
  return (
    <Styled.Button className={'column is-full has-text-centered '}>
      {href ? (
        <Link to={href}>
          <Btn />
        </Link>
      ) : (
        <Btn />
      )}
    </Styled.Button>
  )
}

export const HideTablet = Styled.HideTablet
export const HideDesktop = Styled.HideDesktop
export const PageTitle = Styled.PageTitle
export const PageDescription = Styled.PageDescription
export const Section = Styled.Section
export const SectionBlack = Styled.SectionBlack
export const SectionInner = Styled.SectionInner
export const SectionTitle = Styled.SectionTitle
export const TextTitle = Styled.TextTitle
export const TextRegular = Styled.TextRegular
export const CustomContainer = Styled.CustomContainer
export const CustomPageTitle = Styled.CustomPageTitle
export const CustomConstrainedWidthContainer = Styled.CustomConstrainedWidthContainer
export const CustomSection = Styled.CustomSection
export const CustomSectionTitle = Styled.CustomSectionTitle
export const CustomTextTitle = Styled.CustomTextTitle
export const CustomTextRegular = Styled.CustomTextRegular
export const Button = Styled.Button
export const CustomSectionInner = Styled.CustomSectionInner
export const CustomPageDescription = Styled.CustomPageDescription
export const BlackButton = Styled.BlackButton
export const FlexWrapper = Styled.FlexWrapper
