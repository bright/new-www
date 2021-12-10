import styled from 'styled-components'
import { BlackButton } from '../../components/about-us/about-us.styled'
import { CustomSection, CustomTextRegular } from '../../components/shared'
import variables from '../../styles/variables'

export const CustomSectionOurService = styled(CustomSection)`
  padding-top: ${variables.pxToRem(48)};
  padding-bottom: 0;

  @media ${variables.device.tablet} {
    padding-top: ${variables.pxToRem(48)};
    padding-bottom: ${variables.pxToRem(44)};
  }
`

export const Section = styled.section`
  padding: 0 0 ${variables.pxToRem(186)};
  color: #131214;
  & .content {
    font-size: ${variables.pxToRem(22)};
    line-height: ${variables.pxToRem(40)};

    & img {
      opacity: 1;
    }
    & li {
      opacity: 0.75;
      margin-bottom: 1em;
      @media ${variables.device.tablet} {
        opacity: 1;
        font-size: ${variables.pxToRem(16)};
        line-height: ${variables.pxToRem(28)};
      }
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
    color: #000000;
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
    color: #131214;
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
  @media ${variables.device.tablet} {
    font-size: ${variables.pxToRem(18)};
    line-height: ${variables.pxToRem(30)};
    padding: ${variables.pxToRem(18)} 0;
  }
`
export const FaqsTextRegural = styled(CustomTextRegular)`
  font-size: ${variables.pxToRem(22)};
  padding-bottom: ${variables.pxToRem(36)};
  color: #000000;
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

  @media ${variables.device.tablet} {
    padding-bottom: ${variables.pxToRem(18)};
    padding-top: ${variables.pxToRem(6)};
    & li {
      margin-bottom: 1em;
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(28)};
    }
    && p {
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(28)};
    }
  }
`

export const BlackButtonOurService = styled(BlackButton)<{ marginTopTablet?: string }>`
  margin: 0 auto;
  margin-top: ${variables.pxToRem(105)};
  display: flex;
  justify-content: center;
  text-align: center;

  @media ${variables.device.tablet} {
    margin-top: ${({ marginTopTablet }) => (marginTopTablet ? marginTopTablet : `${variables.pxToRem(64)}`)};
  }
`
export const ImageWrapper = styled.div`
  && .about-img {
    display: block;
    margin: auto;
    max-width: ${variables.pxToRem(1295)};
  }
`
