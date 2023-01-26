import styled, { css } from 'styled-components'
import variables from '../../styles/variables'
import { pxToRem } from './../../styles/variables'

export const HideTablet = styled.div({
  ['@media screen and (max-width: 767px)']: {
    display: 'none',
  },
})

export const HideDesktop = styled.div({
  ['@media screen and (min-width: 768px)']: {
    display: 'none',
  },
})

export const Section = styled.section`
  padding: 2rem 2rem 6rem 2rem;
  color: ${variables.color.text2};

  @media ${variables.device.mobile} {
    padding: 2rem 0.5rem 1rem;
  }
`

export const SectionBlack = styled(Section)`
  background-color: ${variables.color.text};
  color: ${variables.color.white};
`

export const SectionInner = styled.div`
  max-width: 955px;
  margin: 0 auto;
`

export const TitleBase = `
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  letter-spacing: 0;
  text-align: center;
`

export const SectionTitle = styled.h3`
  ${TitleBase};
  font-size: ${variables.pxToRem(28)};
  font-weight: 900;
  margin: 1em 0 3rem;
  color: ${variables.color.heading};

  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(25)};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
  }
`

export const TextTitle = styled.h3`
  ${TitleBase};
  margin: 1em 0;
  font-size: ${variables.pxToRem(28)};
  font-weight: 900;
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(25)};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
  }
`

export const TextRegular = styled.div`
  font-family: ${variables.font.text.family};
  font-size: ${variables.pxToRem(20)};
  color: ${variables.color.text};
  line-height: 2rem;
  font-weight: 400;

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
  }
`

export const PageTitle = styled.h1`
  ${TitleBase};
  display: block;
  font-family: Montserrat, sans-serif;
  font-size: ${variables.pxToRem(54)};
  font-weight: 900;
  line-height: 4rem;
  text-align: center;
  color: ${variables.color.heading};
  & > span {
    color: ${variables.color.primary};
  }
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(44)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(38)};
  }
  @media ${variables.device.tablet} {
    font-size: ${variables.pxToRem(38)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(32)};
    font-weight: 700;
  }
`

export const PageDescription = styled(TextRegular)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingTop: '30px',
  paddingBottom: '10px',
  margin: '0 auto 2rem',

  textAlign: 'left',
  maxWidth: '955px',
  color: variables.color.text,
  padding: '10px',
})

const moreButtonColorPrimary = css`
  border: 1px solid ${variables.color.primary};
  background: ${variables.color.primary};
  color: ${variables.color.text};
  &:hover {
    border: 1px solid ${variables.color.text2};
    color: #ffffff;
    background: ${variables.color.text2};
  }
`

const moreButtonColorBlack = css`
  border: 1px solid ${variables.color.text2};
  background: ${variables.color.text2};
  color: ${variables.color.white};
  &:hover {
    color: ${variables.color.white};
    background: ${variables.color.primary};
    border: 1px solid ${variables.color.primary};
  }
`

export const Button = styled.div<{
  isBlack?: boolean
  isPrimary?: boolean
  marginTop?: string
  positionLeft?: boolean
}>`
  display: flex;
  justify-content: ${({ positionLeft }) => (positionLeft ? 'flex-start' : 'center')};
  & button {
    border: 1px solid ${variables.color.text2};
    background: ${variables.color.white};
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0;
    color: ${variables.color.text2};
    opacity: 1;
    padding: ${variables.pxToRem(16)} ${variables.pxToRem(64)};
    font-size: ${variables.pxToRem(18)};
    cursor: pointer;
    margin-top: ${({ marginTop }) => (marginTop ? marginTop : `${variables.pxToRem(48)}`)};
    transition: all 0.3s ease-out;
    &:hover {
      color: ${variables.color.white};
      background: ${variables.color.text2};
      border: 1px solid ${variables.color.text2};
    }
    ${({ isBlack }) => isBlack && moreButtonColorBlack}
    ${({ isPrimary }) => isPrimary && moreButtonColorPrimary}
  }
  @media ${variables.device.mobile} {
    width: 100%;
    display: block;
    & button {
      padding: ${variables.pxToRem(8)} ${variables.pxToRem(16)};
      width: 100%;
    }
  }
`
export const CustomContainer = styled.div`
  max-width: 1650px;
  margin: auto;

  /* @media ${variables.device.mobile} {
    max-width: calc(100% - 18px);
  } */
`
export const CustomPageTitle = styled.h1<{
  fontSize?: string
  mobileFontSize?: string
  tabletFontSize?: string
  tabletXLFontSize?: string
  laptopFontSize?: string
}>`
  ${TitleBase};
  display: block;
  font-family: Montserrat, sans-serif;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : `${variables.pxToRem(54)}`)};
  font-weight: 900;
  line-height: 4.125rem;
  text-align: center;
  color: ${variables.color.heading};

  & > span {
    color: ${variables.color.primary};
  }
  @media ${variables.device.laptop} {
    font-size: ${({ laptopFontSize }) => (laptopFontSize ? laptopFontSize : `${variables.pxToRem(44)}`)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${({ tabletXLFontSize }) => (tabletXLFontSize ? tabletXLFontSize : `${variables.pxToRem(38)}`)};
  }
  @media ${variables.device.tablet} {
    font-size: ${({ tabletFontSize }) => (tabletFontSize ? tabletFontSize : `${variables.pxToRem(38)}`)};
    font-weight: 900;
    line-height: 2.44rem;
  }
  @media ${variables.device.mobile} {
    font-size: ${({ mobileFontSize }) => (mobileFontSize ? mobileFontSize : `${variables.pxToRem(32)}`)};
  }
`
export const CustomConstrainedWidthContainer = styled.div`
  max-width: 1854px;
  margin: 0 auto;
  padding: 3.3rem 0;

  @media ${variables.device.mobile} {
    max-width: calc(100% - 36px);
    margin: 0 auto;
    padding: 4rem 0 5rem 0;
  }
`
export const CustomSection = styled.section<{
  paddingMobileProps?: string
  paddingProps?: string
  paddingLaptop?: string
  paddingTabletXL?: string
  paddingTablet?: string
}>`
  color: ${variables.color.text2};
  padding: ${({ paddingProps }) => (paddingProps ? paddingProps : '2rem 15rem 4rem 15rem')};
  @media ${variables.device.desktop} {
    padding: ${({ paddingProps }) => (paddingProps ? paddingProps : '2rem 15rem 4rem 15rem')};
  }

  @media ${variables.device.laptop} {
    padding: ${({ paddingLaptop }) => (paddingLaptop ? paddingLaptop : ' 0rem 6rem 0rem')};
  }

  @media ${variables.device.tabletXL} {
    padding: ${({ paddingTabletXL }) => (paddingTabletXL ? paddingTabletXL : ' 0rem 9rem 0rem')};
  }

  @media ${variables.device.tablet} {
    padding: ${({ paddingTablet }) => (paddingTablet ? paddingTablet : ' 0rem 2.25rem 0rem')};
  }

  @media ${variables.device.mobile} {
    padding: ${({ paddingMobileProps }) => (paddingMobileProps ? paddingMobileProps : '2rem 1.125rem 1rem')};
  }
`
export const CustomSectionTitle = styled.h2<{
  margin?: string
  mobileMargin?: string
  laptopMargin?: string
  tabletMargin?: string
  tabletXLMargin?: string
}>`
  ${TitleBase};
  font-size: ${variables.pxToRem(40)};
  font-weight: 900;
  line-height: 150%;
  margin: ${({ margin }) => (margin ? margin : '9.625rem 0 6.56rem')};
  color: ${variables.color.heading};
  & span:not(a span) {
    color: ${variables.color.primary};
  }
  & a {
    color: ${variables.color.text};
    text-decoration: underline;
    padding: 3px 0;
    &:hover {
      color: ${variables.color.text};
    }
    & span {
      padding: 3px 0;

      line-height: 50px;
    }
  }

  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(34)};
    line-height: 2.625rem;
    margin: ${({ laptopMargin }) => (laptopMargin ? laptopMargin : '7.25rem 0 5.1875rem')};
  }
  @media ${variables.device.tabletXL} {
    margin: ${({ tabletXLMargin }) => (tabletXLMargin ? tabletXLMargin : '7.25rem 0 5.1875rem')};
  }
  @media ${variables.device.tablet} {
    margin: ${({ tabletMargin }) => (tabletMargin ? tabletMargin : '7.25rem 0 5.1875rem')};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(22)};
    font-weight: 900;
    line-height: 1.6875rem;
    margin: ${({ mobileMargin }) => (mobileMargin ? mobileMargin : '5.125rem 0 4rem')};
  }
`
export const CustomTextTitle = styled.h3<{
  margin?: string
  mobileMargin?: string
  laptopMargin?: string
  tabletMargin?: string
  tabletXLMargin?: string
}>`
  ${TitleBase};
  margin: ${({ margin }) => (margin ? margin : 'margin: 1em 0')};
  font-size: ${variables.pxToRem(28)};
  font-weight: 900;
  line-height: 1.6875rem;
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(25)};
    margin: ${({ laptopMargin }) => (laptopMargin ? laptopMargin : 'margin: 1em 0')};
  }
  @media ${variables.device.tabletXL} {
    margin: ${({ tabletXLMargin }) => (tabletXLMargin ? tabletXLMargin : 'margin: 1em 0')};
  }
  @media ${variables.device.tablet} {
    margin: ${({ tabletMargin }) => (tabletMargin ? tabletMargin : 'margin: 1em 0')};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
    margin: ${({ mobileMargin }) => (mobileMargin ? mobileMargin : 'margin: 1em 0')};
  }
`
export const CustomTextRegular = styled.div`
  font-family: ${variables.font.text.family};
  font-size: ${variables.pxToRem(20)};
  line-height: ${variables.pxToRem(40)};
  font-weight: 400;
  &::first-letter {
    text-transform: uppercase;
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(28)};
  }
`
export const CustomSectionInner = styled(SectionInner)<{
  maxWidth?: string
  laptopMaxWidth?: string
  tabletXLMaxWidth?: string
  tabletMaxWidth?: string
  mobileMaxWidth?: string
}>`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '800px')};

  @media ${variables.device.laptop} {
    max-width: ${({ laptopMaxWidth }) => (laptopMaxWidth ? laptopMaxWidth : '745px')};
  }
  @media ${variables.device.tabletXL} {
    max-width: ${({ tabletXLMaxWidth }) => (tabletXLMaxWidth ? tabletXLMaxWidth : '824px')};
  }
  @media ${variables.device.tablet} {
    max-width: ${({ tabletMaxWidth }) => (tabletMaxWidth ? tabletMaxWidth : '')};
  }
  @media ${variables.device.mobile} {
    max-width: ${({ mobileMaxWidth }) => (mobileMaxWidth ? mobileMaxWidth : '')};
  }
`
export const CustomPageDescription = styled(PageDescription)<{ fontSize?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : `${variables.pxToRem(22)} `)};
  line-height: ${variables.pxToRem(40)};
  color: ${variables.color.text};

  @media ${variables.device.tablet} {
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(28)};
  }
`

export const BlackButton = styled(Button)`
  box-sizing: border-box;
  padding: 1rem 4rem;
  background: #000000;
  font: normal normal 700 18px/22px Montserrat;
  color: #fff;
  cursor: pointer;
  border: none;
  transition: all 0.25s;
  text-align: center;
  width: fit-content;

  &:hover {
    background: ${variables.color.primary};
    color: #fff;
    justify-content: ;
  }
`
export const FlexWrapper = styled.div<{
  desktopDirection?: string
  desktopContent?: string
  desktopItems?: string
  desktopGap?: string
  desktopWrap?: string
  desktopBasis?: string
  laptopDirection?: string
  laptopContent?: string
  laptopItems?: string
  laptopGap?: string
  laptopWrap?: string
  laptopBasis?: string
  tabletXLDirection?: string
  tabletXLContent?: string
  tabletXLItems?: string
  tabletXLGap?: string
  tabletXLWrap?: string
  tabletXLBasis?: string
  tabletDirection?: string
  tabletContent?: string
  tabletItems?: string
  tabletGap?: string
  tabletWrap?: string
  tabletBasis?: string
  mobileDirection?: string
  mobileContent?: string
  mobileItems?: string
  mobileGap?: string
  mobileWrap?: string
  mobileBasis?: string
}>`
  display: flex;
  flex-direction: ${({ desktopDirection }) => desktopDirection};
  justify-content: ${({ desktopContent }) => desktopContent};
  align-items: ${({ desktopItems }) => desktopItems};
  gap: ${({ desktopGap }) => desktopGap};
  flex-wrap: ${({ desktopWrap }) => desktopWrap};
  flex-basis: ${({ desktopBasis }) => desktopBasis};

  @media ${variables.device.laptop} {
    flex-direction: ${({ laptopDirection }) => laptopDirection};
    justify-content: ${({ laptopContent }) => laptopContent};
    align-items: ${({ laptopItems }) => laptopItems};
    gap: ${({ laptopGap }) => laptopGap};
    flex-wrap: ${({ laptopWrap }) => laptopWrap};
    flex-basis: ${({ laptopBasis }) => laptopBasis};
  }
  @media ${variables.device.tabletXL} {
    flex-direction: ${({ tabletXLDirection }) => tabletXLDirection};
    justify-content: ${({ tabletXLContent }) => tabletXLContent};
    align-items: ${({ tabletXLItems }) => tabletXLItems};
    gap: ${({ tabletXLGap }) => tabletXLGap};
    flex-wrap: ${({ tabletXLWrap }) => tabletXLWrap};
    flex-basis: ${({ tabletXLBasis }) => tabletXLBasis};
  }
  @media ${variables.device.tablet} {
    flex-direction: ${({ tabletDirection }) => tabletDirection};
    justify-content: ${({ tabletContent }) => tabletContent};
    align-items: ${({ tabletItems }) => tabletItems};
    gap: ${({ tabletGap }) => tabletGap};
    flex-wrap: ${({ tabletWrap }) => tabletWrap};
    flex-basis: ${({ tabletBasis }) => tabletBasis};
  }
  @media ${variables.device.mobile} {
    flex-direction: ${({ mobileDirection }) => mobileDirection};
    justify-content: ${({ mobileContent }) => mobileContent};
    align-items: ${({ mobileItems }) => mobileItems};
    gap: ${({ mobileGap }) => mobileGap};
    flex-wrap: ${({ mobileWrap }) => mobileWrap};
    flex-basis: ${({ mobileBasis }) => mobileBasis};
  }
`
