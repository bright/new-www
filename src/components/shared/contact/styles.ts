import styled from 'styled-components'
import { TextRegular, TextTitle } from '..'
import variables from '../../../styles/variables'
import { Button as ButtonBase } from '../../whatWeDo/banners/styles'
import { lighten, rgba } from 'polished'

export const Header = styled.div({
  fontSize: '36px',
  lineHeight: '42px',
  fontWeight: 800,
  fontFamily: variables.font.title.family,

  color: variables.color.heading,
})

export const Description = styled.div({
  fontSize: '16px',
  lineHeight: '28px',
  fontFamily: variables.font.text.family,

  marginTop: '55px',
})

export const Form = styled.form({
  marginTop: '55px',
  ['& .isSelected']: {
    color: variables.color.text,
    opacity: 1,
  },
  ['& .isDefault']: {
    color: variables.color.text,
    opacity: 0.56,
  },

  ['@media screen and (max-width: 767px)']: {
    marginTop: '35px',
  },
})

export const SubmitButton = styled.button({
  display: 'block',
  fontSize: '18px',
  lineHeight: '22px',
  fontFamily: variables.font.title.family,
  fontWeight: 'bold',
  cursor: 'pointer',

  color: variables.color.white,
  backgroundColor: variables.color.text,

  height: '54px',
  width: '230px',

  margin: '0 auto',
  padding: '15px 82px',

  ['&:disabled']: {
    cursor: 'default',
    backgroundColor: 'grey',
  },

  ['@media screen and (max-width: 767px)']: {
    marginTop: '50px',
    width: '100%',
  },
})

export const Label = styled.div({
  fontSize: '16px',
  lineHeight: '40px',

  fontFamily: variables.font.text.family,
  color: variables.color.text,
})

const placeHolderStyle = {
  '&::placeholder': {
    color: variables.color.text,
    opacity: 0.56,
  },
}

export const TextInput = styled.input({
  height: '48px',
  maxWidth: '445px',
  width: '100%',

  fontSize: '16px',
  lineHeight: '40px',
  fontFamily: variables.font.text.family,

  color: variables.color.text,

  padding: '20px',
  border: `1px solid ${variables.color.borderInput}`,
  ...placeHolderStyle,
  marginBottom: '40px',

  ['&:focus-visible']: {
    outline: '1px solid #000',
    background: 'inherit',
  },
  [':focus:not(:focus-visible)']: {
    outline: 'none',
  },

  ['@media screen and (max-width: 767px)']: {
    marginBottom: '10px',
  },
})

export const SingleSelect = styled.select({
  height: '48px',
  maxWidth: '445px',
  width: '100%',

  fontSize: '16px',
  lineHeight: '40px',

  fontFamily: variables.font.text.family,

  border: `1px solid ${variables.color.borderInput}`,
  background: variables.color.white,
  marginBottom: '40px',

  paddingLeft: '20px',
  ['&:focus-visible']: {
    outline: '1px solid #000',
    background: 'inherit',
  },
  [':focus:not(:focus-visible)']: {
    outline: 'none',
  },

  ['@media screen and (max-width: 767px)']: {
    width: '100%',
    marginBottom: '10px',
  },
})

export const DoubleInputsRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,

  flexWrap: 'wrap',
})

export const DoubleInputsRowEntry = styled.div<{ leftSide?: boolean }>(({ leftSide }) => ({
  marginRight: leftSide ? '64px' : 0,
  width: '45%',

  ['@media screen and (max-width: 767px)']: {
    width: '100%',
    marginRight: 0,
  },
}))

export const IdeaTextArea = styled.textarea({
  height: '228px',
  maxWidth: '955px',
  width: '100%',

  fontSize: '16px',
  lineHeight: '19px',
  fontFamily: variables.font.text.family,
  ...placeHolderStyle,
  color: variables.color.text,

  padding: '20px',

  border: `1px solid ${variables.color.borderInput}`,

  marginBottom: '40px',
  ['&:focus-visible']: {
    outline: '1px solid #000',
    background: 'inherit',
  },
  ['&:focus:not(:focus-visible)']: {
    outline: 'none',
  },

  ['@media screen and (max-width: 767px)']: {
    marginBottom: '10px',
  },
})

export const PrivacyPolicyCheckboxContainer = styled(TextRegular)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  color: variables.color.text,
})

export const PrivacyPolicyCheckbox = styled.input({
  height: '30px',
  width: '30px',
  marginRight: '19px',
})

const SubmitMessage = styled.div({
  fontSize: '20px',
  lineHeight: '24px',

  fontFamily: variables.font.text.family,

  marginTop: '30px',
})

export const RequiredMessage = styled(Label)({
  marginTop: '30px',
  marginBottom: '105px',
})

export const ErrorMessage = styled(SubmitMessage)({
  color: 'red',
})

export const SuccessMessage = styled(SubmitMessage)({
  color: 'green',
})

export const Button = styled(ButtonBase)({
  height: '48px',
  borderColor: '#000000',
  color: '#000000',

  fontWeight: 'normal',
})
