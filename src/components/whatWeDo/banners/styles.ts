import styled from 'styled-components'
import variables from '../../../styles/variables'
import { CustomSectionTitle } from '../../shared'

const { color } = variables

export const OurAreasButtonWrapper = styled.div`
  & .our-areas-button {
    border: 1px solid ${color.white};
    background: transparent;
    color: ${color.white};
    border-color: ${color.white};
    &:hover {
      color: ${color.primary};
      border-color: ${color.primary};
    }
  }
`

export const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',

  backgroundColor: `${variables.color.text}`,

  height: '425px',
  width: '100%',
  alignItems: 'center',

  marginTop: '186px',
  ['@media screen and (max-width: 1540px)']: {
    marginTop: '116px',
  },
  ['@media screen and (max-width: 540px)']: {
    marginTop: '83px',
    height: '292px',
    textAlign: 'center',
    padding: '0px 18px',
  },
  padding: '0px 20px',
})

export const ContentWrapper = styled.div({
  maxWidth: '955px',
  backgroundColor: `${variables.color.text}`,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  color: '#FFFFFF',
})

export const Text = styled(CustomSectionTitle)({
  lineHeight: '48px',
  fontWeight: 800,
  fontFamily: variables.font.title.family,
  maxWidth: '640px',
  textAlign: 'center',
  color: 'white',
  margin: '0',

  ['@media screen and (max-width: 1540px)']: {
    maxWidth: '544px',
    lineHeight: '60px',
  },
  ['@media screen and (max-width: 581px)']: {
    maxWidth: '360px',
    lineHeight: '38px',
  },
})
