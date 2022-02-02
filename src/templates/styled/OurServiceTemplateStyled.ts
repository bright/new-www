import styled from 'styled-components'
import { BlackButton } from '../../components/about-us/about-us.styled'
import { CustomPageTitle, CustomSection, CustomTextRegular } from '../../components/shared'
import variables from '../../styles/variables'
import { HideTablet } from './../../components/shared/index.styled'

export const CustomSectionOurService = styled(CustomSection)`
  padding-top: ${variables.pxToRem(64)};
  padding-bottom: ${variables.pxToRem(64)};
  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(45)};
    padding-bottom: ${variables.pxToRem(54)};
  }
  @media ${variables.device.tabletXL} {
    padding-top: ${variables.pxToRem(60)};
    padding-bottom: ${variables.pxToRem(48)};
  }
  @media ${variables.device.tablet} {
    padding-top: ${variables.pxToRem(48)};
    padding-bottom: ${variables.pxToRem(44)};
  }

  @media ${variables.device.mobile} {
    padding-top: ${variables.pxToRem(48)};
    padding-bottom: ${variables.pxToRem(44)};
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
  @media ${variables.device.tablet} {
    padding: 0 0 ${variables.pxToRem(82)};
  }
`
export const Content = styled.div<{ textAlign?: string }>`
  font-size: ${variables.pxToRem(22)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
  line-height: ${variables.pxToRem(40)};

  && h2 {
    font-size: ${variables.pxToRem(32)};
    color: #000000;
    font-weight: 900;
    margin: ${variables.pxToRem(64)} 0 ${variables.pxToRem(36)};
    line-height: ${variables.pxToRem(40)};

    & :first-of-type {
      margin: 0 0 ${variables.pxToRem(36)};
    }

    @media ${variables.device.tablet} {
      font-size: ${variables.pxToRem(22)};
      line-height: ${variables.pxToRem(27)};
      color: #000;
      text-align: center;
      & :first-of-type {
        margin: ${variables.pxToRem(32)} 0 ${variables.pxToRem(36)};
      }
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
    color: #131214;
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
    color: #131214;
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

export const BlackButtonOurService = styled(BlackButton)<{ marginTopTablet?: string; marginTop?: string }>`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : `${variables.pxToRem(105)}`)};

  @media ${variables.device.tablet} {
    margin-top: ${({ marginTopTablet }) => (marginTopTablet ? marginTopTablet : `${variables.pxToRem(64)}`)};
  }
`
export const ImageWrapper = styled.div`
  && .about-img {
    display: block;
    margin: auto;
    max-width: 69%;
    @media ${variables.device.laptop} {
      max-width: 80%;
    }
    @media ${variables.device.tabletXL} {
      max-width: 72%;
    }
    @media ${variables.device.tablet} {
      max-width: 100%;
    }
  }
`
export const OurServiceHideTablet = styled(HideTablet)`
  @media ${variables.device.tablet} {
    display: none;
  }
`
export const OurServicePageTitle = styled(CustomPageTitle)`
  font-size: ${variables.pxToRem(48)};
  line-height: ${variables.pxToRem(54)};
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(44)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(38)};
  }
  @media ${variables.device.mobile} {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.44rem;
  }
`
