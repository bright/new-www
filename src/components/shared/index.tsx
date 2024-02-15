import React, { PropsWithChildren } from 'react'
import { Link } from 'gatsby'
import * as Styled from './index.styled'

interface MoreButtonProps {
  onClick?: (e: React.MouseEvent) => void
  href?: string
  text?: string
  isSubmit?: boolean
  disabled?: boolean
  className?: string
  isBlack?: boolean
  isPrimary?: boolean
  marginTop?: string
  isPositionLeft?: boolean
}

export const MoreButton: React.FC<PropsWithChildren<MoreButtonProps>> = ({
  onClick,
  href,
  text,
  disabled,
  isSubmit,
  children,
  className,
  isBlack,
  isPrimary,
  marginTop,
  isPositionLeft,
}) => {
  const Btn = () => (
    <button type={isSubmit ? 'submit' : 'button'} disabled={disabled} onClick={onClick} className={className}>
      {text || children}
    </button>
  )
  const BtnLink = ({ hrefTarget }: { hrefTarget: string }) => {
    if (hrefTarget.includes('#')) {
      return (
        <a href={hrefTarget}>
          <Btn />
        </a>
      )
    } else {
      return (
        <Link to={hrefTarget}>
          <Btn />
        </Link>
      )
    }
  }

  return (
    <Styled.Button isBlack={isBlack} isPrimary={isPrimary} marginTop={marginTop} positionLeft={isPositionLeft}>
      {href ? <BtnLink hrefTarget={href} /> : <Btn />}
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

export * from './StatusPanel'