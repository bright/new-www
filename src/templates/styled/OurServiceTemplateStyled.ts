import styled from 'styled-components'
import { CustomPageTitle, CustomSection, CustomTextRegular, FlexWrapper } from '../../components/shared'
import variables from '../../styles/variables'
import image from '../../../static/images/bullet_point.svg'
import { HideTablet } from './../../components/shared/index.styled'
import { clampBuilder } from './../../helpers/clampBuilder'

export const CustomSectionOurService = styled(CustomSection)`
  flex-basis: 47.5%;
  height: 100%;
  padding-top: ${clampBuilder(1542, 1920, 100, 177)};

  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(120)};
  }

  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(120)};
  }

  @media ${variables.device.tablet} {
    flex-basis: 100%;
    padding-top: ${variables.pxToRem(64)};
  }
`
export const CustomSectionOurServiceImage = styled(CustomSection)`
  flex-basis: 52.5%;
  height: 100%;
  padding-top: ${clampBuilder(1542, 1920, 21, 56)};

  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(120)};
  }

  @media ${variables.device.tablet} {
    flex-basis: 100%;
    padding-top: ${variables.pxToRem(64)};
  }
`

export const OurServiceSection = styled.section`
  padding: 0 0 ${variables.pxToRem(186)};
  color: #131214;

  & .content {
    font-size: ${variables.pxToRem(22)};
    line-height: ${variables.pxToRem(40)};
    color: #0a0a0a;

    & img {
      opacity: 1;
    }
  }
  & .content > ul > li {
    opacity: 1;
    margin-bottom: 1em;
    color: #0a0a0a;
    @media ${variables.device.tablet} {
      opacity: 1;
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(28)};
    }
  }
  @media ${variables.device.tabletXL} {
    padding: ${variables.pxToRem(182)} 0 ${variables.pxToRem(82)};
  }
  @media ${variables.device.tablet} {
    padding: 0 0 ${variables.pxToRem(82)};
  }
`
export const Content = styled.div<{ textAlign?: string }>`
  font-size: ${variables.pxToRem(22)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
  line-height: ${variables.pxToRem(40)};

  && h2 {
    font-size: ${variables.pxToRem(40)};
    color: #000000;
    font-weight: 900;
    margin: ${variables.pxToRem(64)} 0 ${variables.pxToRem(36)};
    line-height: ${variables.pxToRem(40)};

    &:first-of-type {
      margin: 0 0 ${variables.pxToRem(36)};
    }

    @media ${variables.device.tablet} {
      font-size: ${variables.pxToRem(34)};
      line-height: ${variables.pxToRem(27)};
      color: #000;
      text-align: center;
      &:first-of-type {
        margin: ${variables.pxToRem(32)} 0 ${variables.pxToRem(36)};
      }
    }

    @media ${variables.device.mobile} {
      font-size: ${variables.pxToRem(22)};
    }
  }

  && h3 {
    font-size: 2rem;
    color: ${variables.color.heading};
    font-weight: 600;
    line-height: ${variables.pxToRem(40)};
    margin-top: 0;
    margin: ${variables.pxToRem(80)} 0 ${variables.pxToRem(36)};

    &&:first-of-type {
      margin-top: 0;
    }

    @media ${variables.device.tablet} {
      margin: 0;
      margin: ${variables.pxToRem(64)} 0 ${variables.pxToRem(36)};
      font-size: ${variables.pxToRem(18)};
      font-weight: 800;
      line-height: ${variables.pxToRem(30)};
      color: #000;
      position: relative;
    }
  }

  & strong {
    color: ${variables.color.text};
    opacity: 1;
  }

  && p {
    font-size: ${variables.pxToRem(22)};
    line-height: ${variables.pxToRem(40)};
    color: ${variables.color.text};
    opacity: 1;
    font-family: ${variables.font.customtext.lato};
    margin-bottom: ${variables.pxToRem(16)};

    & span {
      background-color: ${variables.color.primary};
      opacity: 1;
      font-weight: 900;
    }

    @media ${variables.device.tablet} {
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(28)};
      color: #000;
      opacity: 1;
    }
  }
`
export const FaqWrapper = styled.div`
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`
export const Question = styled.h3<{ shown: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  font: normal normal 700 ${variables.pxToRem(26)} / ${variables.pxToRem(40)} Montserrat;
  letter-spacing: 0px;
  color: #000000;
  padding: ${variables.pxToRem(35)} 0;
  cursor: pointer;

  p {
    flex-basis: 90%;
  }

  & span img {
    ${({ shown }) => (shown ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)')};
  }
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(24)};
    line-height: ${variables.pxToRem(40)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(20)};
    line-height: ${variables.pxToRem(40)};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
    line-height: ${variables.pxToRem(30)};
    padding: ${variables.pxToRem(28)} 0;
  }
`
export const FaqsTextRegural = styled(CustomTextRegular)`
  font-size: ${variables.pxToRem(22)};
  padding-bottom: ${variables.pxToRem(36)};
  color: #0a0a0a;
  opacity: 1;

  & strong {
    color: ${variables.color.text};
  }

  & li {
    margin-bottom: 1em;
    font-size: ${variables.pxToRem(22)};
  }

  && p {
    font-size: ${variables.pxToRem(22)};
  }
  @media ${variables.device.laptop} {
    & li {
      margin-bottom: 1em;
      font-size: ${variables.pxToRem(20)};
      line-height: ${variables.pxToRem(40)};
    }

    && p {
      font-size: ${variables.pxToRem(20)};
      line-height: ${variables.pxToRem(40)};
    }
  }

  @media ${variables.device.mobile} {
    padding-bottom: ${variables.pxToRem(28)};
    padding-top: ${variables.pxToRem(0)};
    & li {
      margin-bottom: 1em;
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(40)};
    }

    && p {
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(40)};
    }
  }
`

export const MoreButtonOurServiceWrapper = styled.div<{
  marginTopTablet?: string
  marginTop?: string
  margin?: string
  tabletWidth?: string
  marginTopMobile?: string
}>`
  margin: ${({ margin }) => (margin ? margin : `0 auto`)};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : `${variables.pxToRem(105)}`)};

  @media ${variables.device.tablet} {
    margin-top: ${({ marginTopTablet }) => (marginTopTablet ? marginTopTablet : `${variables.pxToRem(64)}`)};
    width: ${({ tabletWidth }) => (tabletWidth ? tabletWidth : '')};
  }
  @media ${variables.device.mobile} {
    margin-top: ${({ marginTopMobile }) => (marginTopMobile ? marginTopMobile : `${variables.pxToRem(64)}`)};
    padding: 1rem 1rem;
  }
`
export const ImageWrapper = styled.div`
  flex-basis: 50%;
  @media ${variables.device.tablet} {
    flex-basis: 100%;
    overflow: hidden;
  }
  && .about-img {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`
export const OurServiceHideTablet = styled(HideTablet)`
  @media ${variables.device.tablet} {
    display: none;
  }
`
export const OurServicePageTitle = styled(CustomPageTitle)`
  display: flex;
  flex-wrap: wrap;

  font-size: ${clampBuilder(1542, 1920, 54, 64)};
  line-height: ${clampBuilder(1542, 1920, 65, 78)};
  font-weight: 800;
  text-align: left;
  letter-spacing: -0.04em;
  & .highlighted-word {
    font-style: normal;
    font-weight: 300;
  }
  & span {
    color: ${variables.color.text2};
    padding-right: ${variables.pxToRem(10)};
    &:last-child {
      padding-right: 0;
    }
  }
  @media ${variables.device.laptop} {
    font-size: ${clampBuilder(1281, 1542, 52, 54)};
    line-height: ${clampBuilder(1281, 1542, 63, 65)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${clampBuilder(992, 1280, 44, 52)};
    line-height: ${clampBuilder(992, 1280, 53, 63)};
  }
  @media ${variables.device.tablet} {
    font-size: ${variables.pxToRem(74)};
    line-height: ${variables.pxToRem(90)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(52)};
    line-height: ${variables.pxToRem(63)};
  }
`
export const BulletList = styled.li`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: ${variables.pxToRem(20)};
  line-height: ${variables.pxToRem(40)};

  color: #0a0a0a;
  padding-inline-start: 16px;
  display: list-item;
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(32)};
  }
`
export const BulletsList = styled.ul`
  list-style: outside url(${image}) none;
  padding-inline-start: 27px;
`
export const CloutchWrapper = styled.div`
  padding-top: ${variables.pxToRem(16)};
`
export const OurServiceFlexWraper = styled(FlexWrapper)`
  height: 100vh;

  @media ${variables.device.tabletXL} {
    height: 100%;
  }
`
