import styled from 'styled-components'
import { TextRegular, TextTitle } from '../../shared'
import variables from '../../../styles/variables'
import { Link } from 'gatsby'
import { pxToRem } from './../../../styles/variables'

export const DevelopmentAreasWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',

  width: '100%',
})

export const DevelopmentAreasContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'row',
  flexWrap: 'wrap',
  maxWidth: '1344px',
})

export const Title = styled(TextTitle)({
  marginTop: '36px',
  marginBottom: '54px',
  fontSize: '22px',
  lineHeight: '27px',

  [`@media screen and (max-width: 767px)`]: {
    marginTop: '30px',
  },
})

export const SectionText = styled(TextRegular)({
  color: variables.color.text,

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
  color: #363636;
  &:hover {
    color: ${variables.color.primary};
  }
`
export const DevelopmentAreaContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  margin-top: ${variables.pxToRem(65)};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${variables.pxToRem(10)} ${variables.pxToRem(30)};
  flex-basis: 50%;

  & p {
    font-family: ${variables.font.customtext.lato};
    font-size: ${variables.pxToRem(22)};
    line-height: ${variables.pxToRem(40)};
    color: #000000;
    opacity: 0.75;
  }

  @media ${variables.device.tablet} {
    flex-basis: 100%;
    & p {
      font-size: ${variables.pxToRem(18)};
      line-height: ${variables.pxToRem(32)};
    }
  }
`
export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${variables.device.tablet} {
    & .about-img {
      & .image {
        max-height: ${variables.pxToRem(75)};
        width: auto;
      }
    }
  }
`
