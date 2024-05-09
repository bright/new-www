import styled from 'styled-components'
import variables from '../styles/variables'
import { clampBuilder } from '../helpers/clampBuilder'
import { CustomPageTitle, CustomSection, FlexWrapper } from '../components/shared'

export const CustomSectionOurService = styled(CustomSection)`
  height: 100%;

  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(103.5)};
    flex-basis: 44.5%;
  }

  @media ${variables.device.tabletXL} {
    padding-top: ${variables.pxToRem(60)};
    flex-basis: 47.61%;
  }

  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(64)};
  }

  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(64)};
  }

  @media ${variables.device.laptop} {
    padding-top: ${variables.pxToRem(64)};
  }

  @media ${variables.device.tablet} {
    flex-basis: 100%;
    padding-top: ${variables.pxToRem(64)};
  }
  @media ${variables.device.mobile} {
    flex-basis: 100%;
    padding-top: ${variables.pxToRem(16)};
  }
`

export const OurStudioPageTitle = styled(CustomPageTitle)`
  font-size: ${clampBuilder(1542, 1920, 54, 64)};
  line-height: ${clampBuilder(1542, 1920, 65, 78)};
  font-weight: 800;
  text-align: left;
  letter-spacing: -0.04em;
  & .highlighted-word {
      color: ${variables.color.primary};
  }
  & span {
      color: ${variables.color.text};
  }
  @media ${variables.device.laptop} {
    font-size: ${clampBuilder(1281, 1542, 45, 57)};
    line-height: ${clampBuilder(1281, 1542, 54.86, 69.48)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${clampBuilder(992, 1280, 44, 45)};
    line-height: ${clampBuilder(992, 1280, 53, 54.86)};
  }
  @media ${variables.device.tablet} {
    font-size: ${variables.pxToRem(68)};
    line-height: ${variables.pxToRem(82.89)};
  }
  @media ${variables.device.mobile} {
    font-size: ${clampBuilder(200, 581, 40, 45)};
    line-height: ${variables.pxToRem(47.25)};
  }
`

export const StudioContent = styled.div<{ textAlign?: string }>`
  font-size: ${variables.pxToRem(22)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
  line-height: ${variables.pxToRem(40)};

  && h2 {
    font-size: ${variables.pxToRem(40)};
    color: #000000;
    font-weight: 900;
    margin: ${variables.pxToRem(64)} 0 ${variables.pxToRem(36)};
    line-height: ${variables.pxToRem(40)};
    text-align: center;

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
    
  & img {
      border-radius: 16px;
  }
}
`

export const MobileOurServiceFlexWrapper = styled(FlexWrapper)`
  @media ${variables.device.mobile} {
    gap: ${variables.pxToRem(40)};
  }
`

export const SliderSection = styled(CustomSection)`
  && img {
    border-radius: 16px;
  }
`
export const ImageWrapper = styled.div`
  @media ${variables.deviceWidthMin.tablet} {
    filter: drop-shadow(0 1rem 1rem #d4d4d4);
    
    && img {
        display: block;
        max-width: 100%;
        border-radius: 16px;
    }
  }

  @media ${variables.device.tablet} {
    filter: none;
      
    && img {
      border-radius: 0;
    }
  }
`

export const HeroWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: ${variables.pxToRem(60)};

  @media ${variables.device.tablet} {
    grid-template-columns: 1fr;
    margin-bottom: ${variables.pxToRem(60)};
  }
`

export const CustomSectionOurServiceImage = styled(CustomSection)`
  flex-basis: 52.5%;
  height: 100%;
`

export const RoundedImage = styled.div`
    & img {
        border-radius: 16px;
    }
`

export const FormHeading = styled.div`
    max-width: 800px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    margin-bottom: 3rem;

    @media ${variables.device.laptop} {
        max-width: 800px;
    }
    @media ${variables.device.tabletXL} {
        max-width: 824px;
    }
    @media ${variables.device.tablet} {
        max-width: 100%;
    }
`