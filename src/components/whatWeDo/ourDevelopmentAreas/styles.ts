import styled from 'styled-components'
import { TextRegular, TextTitle } from '../../shared'
import variables from '../../../styles/variables'
import { Link } from 'gatsby'

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

export const SectionTitleContainer = styled.div<{
  iconMobileWidth: string
  iconMobileHeight: string
}>(({ iconMobileWidth, iconMobileHeight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`@media screen and (max-width: 767px)`]: {
    svg: {
      width: iconMobileWidth,
      height: iconMobileHeight,
    },
  },
}))

export const Title = styled(TextTitle)({
  marginTop: '36px',
  marginBottom: '54px',

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

export const DevelopmentAreaContainer = styled.div({
  flexGrow: 0,
  flexShrink: 1,

  marginTop: '65px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  padding: '10px 30px',

  [`@media screen and (min-width: 767px)`]: {
    flexBasis: '50%',
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
