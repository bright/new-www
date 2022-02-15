import styled from 'styled-components'
import { TextRegular, TextTitle } from '../../shared'
import variables from '../../../styles/variables'
import { Link } from 'gatsby'
import { TitleBase } from '../../shared/index.styled'

export const DevelopmentAreasWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',

  width: '100%',
})

export const DevelopmentAreasContainer = styled.div`
  display: flex;
  justify-content: space-around,
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${variables.pxToRem(65)};
  @media ${variables.device.laptop} {
    gap:${variables.pxToRem(56)}
  }
  @media ${variables.device.tabletXL} {
    gap:${variables.pxToRem(45)}
  }
  @media ${variables.device.tablet} {
    gap:${variables.pxToRem(42)}
  }
  @media ${variables.device.mobile} {
    gap:${variables.pxToRem(32)}
  }
  `

export const SectionText = styled(TextRegular)({
  marginTop: '60px',
  textAlign: 'left',
  padding: '0 10px',

  [`@media screen and (max-width: 767px)`]: {
    marginTop: '30px',
    textAlign: 'center',
  },
})

export const GoToContainer = styled.div({
  marginTop: '18px',
})

export const RevertHoverLink = styled(Link)`
  color: ${variables.color.text};
  border: 1px solid #d3d3d3;
  padding: ${variables.pxToRem(43)} ${variables.pxToRem(45)} ${variables.pxToRem(43)};
  min-height: ${variables.pxToRem(410)};
  height: 100%;

  &:hover {
    color: ${variables.color.primary};
  }
  @media ${variables.device.laptop} {
    padding: ${variables.pxToRem(43)} ${variables.pxToRem(39)} ${variables.pxToRem(43)};
  }
  @media ${variables.device.tabletXL} {
    padding: ${variables.pxToRem(37)} ${variables.pxToRem(30)} ${variables.pxToRem(43)};
  }
  @media ${variables.device.tablet} {
    padding: ${variables.pxToRem(37)} ${variables.pxToRem(30)} ${variables.pxToRem(43)};
    min-height: ${variables.pxToRem(310)};
  }
`
export const DevelopmentAreaContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: calc(50% - 65px / 2);
  box-shadow: 0 0 0 #00000029;
  transition: box-shadow 0.1s ease-in, transform 0.1s ease-in;

  & :hover {
    box-shadow: 0 0 60px #00000029;
    transform: scale(1.002);
  }
  & p {
    font-family: ${variables.font.customtext.lato};
    font-size: ${variables.pxToRem(20)};
    line-height: ${variables.pxToRem(40)};
    color: ${variables.color.text};
  }
  @media ${variables.device.laptop} {
    flex-basis: calc(50% - 56px / 2);
  }
  @media ${variables.device.tabletXL} {
    flex-basis: calc(50% - 45px / 2);
  }
  @media ${variables.device.tablet} {
    flex-basis: 100%;

    & p {
      font-size: ${variables.pxToRem(20)};
      line-height: ${variables.pxToRem(40)};
    }
  }
  @media ${variables.device.mobile} {
    & p {
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(28)};
    }
  }
`
export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${variables.device.tablet} {
    && .about-img {
      max-height: ${variables.pxToRem(75)};
      width: auto;
      & .image {
        max-height: ${variables.pxToRem(75)};
        width: auto;
        margin: auto;
      }
    }
  }
`
export const Title = styled.h2`
  ${TitleBase};
  margin-top: ${variables.pxToRem(30)};
  margin-bottom: ${variables.pxToRem(54)};
  font-size: ${variables.pxToRem(28)};
  line-height: ${variables.pxToRem(34)};
  color: inherit;

  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(19)};
    line-height: ${variables.pxToRem(23)};
    margin-top: ${variables.pxToRem(20)};
    margin-bottom: ${variables.pxToRem(30)};
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(19)};
    margin-top: ${variables.pxToRem(18)};
    margin-bottom: ${variables.pxToRem(27)};
  }
`
