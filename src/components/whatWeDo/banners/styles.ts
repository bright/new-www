import styled from 'styled-components'
import variables from '../../../styles/variables'
import { CustomSectionTitle } from '../../shared'

const { color } = variables

export const Button = styled.button`
  width: 100%;
  height: 54px;
  margin-top: 64px;
  max-width: 332px;

  border: 1px solid #ffffff;
  background: transparent;

  font-size: 18px;
  line-height: 22px;
  font-family: ${variables.font.title.family};
  font-weight: bold;

  color: #ffffff;

  letter-spacing: 0px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: ${color.primary};
    border-color: ${color.primary};
  }

  &.hover-white:hover {
    color: #fff;
    border-color: #fff;
  }

  @media (max-width: 540px) {
    width: 100%;
    margin-top: ${variables.pxToRem(49)};
    max-width: 100%
  },
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
  lineHeight: '60px',
  fontWeight: 800,
  fontFamily: variables.font.title.family,
  maxWidth: '640px',
  textAlign: 'center',
  color: 'white',
  margin: '0',

  ['@media screen and (max-width: 1540px)']: {
    maxWidth: '544px',
  },
  ['@media screen and (max-width: 581px)']: {
    maxWidth: '360px',
  },
})
