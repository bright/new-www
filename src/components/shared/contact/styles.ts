import styled from 'styled-components'
import { TextRegular, TextTitle } from '..'
import variables from '../../../styles/variables'
import Arrow from '../../../../static/images/arrow-select.svg'
import { Button as ButtonBase } from './../index'
import { clampBuilder } from '../../../helpers/clampBuilder'

export const Header = styled.div({
  fontSize: '36px',
  lineHeight: '42px',
  fontWeight: 800,
  fontFamily: variables.font.title.family,

  color: variables.color.heading,
})

export const Description = styled.div({
  fontSize: '18px',
  lineHeight: '40px',
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
    color: variables.color.darkerGrey,
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

  height: '40px',
  width: '233px',

  margin: '0 auto',
  padding: '8px 72px',

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
    color: variables.color.darkerGrey,
    fontSize: '16px',
  },
}

export const TextInput = styled.input({
  height: '48px',
  maxWidth: '445px',
  width: '100%',

  fontSize: '18px',
  lineHeight: '40px',
  fontFamily: variables.font.text.family,

  color: variables.color.text,
  appearance: 'none',
  borderRadius: 'unset',
  outline: 0,

  padding: '20px',
  border: `1px solid ${variables.color.darkerGrey}`,
  ...placeHolderStyle,
  marginBottom: '16px',

  ['&:focus-visible']: {
    outline: '1px solid #000',
    background: 'inherit',
  },

  [':focus:not(:focus-visible)']: {
    outline: 'none',
  },
  ['@media screen and (max-width: 1281px)']: {
    maxWidth: '445px',
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

  border: `1px solid ${variables.color.darkerGrey}`,
  background: variables.color.white,
  appearance: 'none',
  marginBottom: '40px',
  borderRadius: 'unset',
  outline: 0,

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
  justifyContent: 'space-between',

  flexWrap: 'wrap',
  ['@media screen and (max-width: 1281px)']: {
    flexDirection: 'row',
  },
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

  fontSize: '18px',
  lineHeight: '40px',
  fontFamily: variables.font.text.family,
  ...placeHolderStyle,
  color: variables.color.text,

  padding: '20px',

  border: `1px solid ${variables.color.darkerGrey}`,

  marginBottom: '16px',

  appearance: 'none',
  borderRadius: 'unset',
  outline: 0,

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

export const SelectWrapper = styled.div`
  position: relative;
  max-width: 445px;
  &::after {
    content: '';
    background: url(${Arrow}) 50% no-repeat;
    background-size: contain;
    pointer-events: none;
    transition: transform 0.2s ease-in-out;
    position: absolute;
    top: calc(23px - 6px);
    right: 16px;
    width: 12px;
    height: 12px;
    z-index: 2;
  }
`

export const PrivacyPolicyCheckboxContainer = styled(TextRegular)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  fontSize: '14px',
  color: variables.color.text
})

export const PrivacyPolicyCheckbox = styled.input({
  height: '30px',
  width: '30px',
  marginRight: '19px',

  borderRadius: 'unset',
})

export const CheckboxFieldContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.5rem;
  font-family: Lato;
  user-select: none;
  label {
    justify-self: start;
    border: 1px solid #888888;
    width: 24px;
    height: 24px;
    display: grid;
    justify-items: center;
    align-items: center;
    margin-right: 1.1875rem;
  }
  input {
    position: absolute;
    opacity: 0;
  }
  input:checked ~ label {
    background: black;
  }
  svg {
    stroke: #fff;
  }
`

const SubmitMessage = styled.div({
  fontSize: '20px',
  lineHeight: '24px',

  fontFamily: variables.font.text.family,

  marginTop: '30px',
})

export const RequiredMessage = styled(Label)({
  marginTop: '16px',
  marginBottom: '32px',
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

export const ContactTextRegular = styled(TextRegular)`
  & a {
    line-height: ${variables.pxToRem(40)};
    position: relative;
    padding: 0 8px 10px;
    font-weight: 700;
    color: ${variables.color.text};
    border-bottom: 1px solid ${variables.color.text};
  }
  @media ${variables.device.mobile} {
    font-size: ${clampBuilder(340, 370, 14, 16)};
    & a {
      padding: 0 8px 8px;
    }
  }
`
