import styled from 'styled-components'
import { CustomTextRegular, TextRegular } from '../shared'
import variables from '../../styles/variables'
import { Button as ButtonBase } from '../whatWeDo/banners/styles'

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
  marginTop: '0',
  ['& .isSelected']: {
    color: variables.color.text,
    opacity: 1,
  },
  ['& .isDefault']: {
    color: variables.color.darkerGrey,
  },

  ['@media screen and (max-width: 767px)']: {
    marginTop: '0',
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
    maxWidth: '100%',
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
    flexDirection: 'column',
  },
})

export const DoubleInputsRowEntry = styled.div({
  marginRight: '0',
  width: 'calc(50% - 12px)',

  ['@media screen and (max-width: 1281px)']: {
    width: '100%',
  },

  ['@media screen and (max-width: 767px)']: {
    width: '100%',
    marginRight: '0',
  },
})

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

// export const SelectWrapper = styled.div`
//   position: relative;
//   max-width: 445px;
//   &::after {
//     content: '';
//     background: url(${Arrow}) 50% no-repeat;
//     background-size: contain;
//     pointer-events: none;
//     transition: transform 0.2s ease-in-out;
//     position: absolute;
//     top: calc(23px - 6px);
//     right: 16px;
//     width: 12px;
//     height: 12px;
//     z-index: 2;
//   }
// `

export const PrivacyPolicyCheckboxContainer = styled(TextRegular)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

export const CheckboxFieldContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.5rem;
  font-family: Lato;
  user-select: none;
  & label {
    justify-self: start;
    border: 1px solid #888888;
    width: 24px;
    height: 24px;
    display: grid;
    justify-items: center;
    align-items: center;
    margin-right: 1.1875rem;
  }
  & input {
    position: absolute;
    opacity: 0;
  }
  & input:checked ~ label {
    background: black;
  }
  & svg {
    stroke: #fff;
  }
`

export const PrivacyPolicyCheckbox = styled.input({
  height: '30px',
  width: '30px',
  marginRight: '19px',

  borderRadius: 'unset',
})

export const SubmitMessage = styled.div({
  fontSize: '20px',
  lineHeight: '24px',

  fontFamily: variables.font.text.family,

  marginTop: '30px',
})

export const RequiredMessage = styled(Label)({
  marginTop: '16px',
  marginBottom: '32px',
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

export const SuccesMessage = styled(CustomTextRegular)`
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`
export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-basis: 48%;
  margin-bottom: 0;
  padding: 0;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`

export const Container = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const ErrorMessage = styled(CustomTextRegular)`
  background: #e50000;
  color: #fff;
  padding: 1rem 1.5rem;
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
    text-align: center;
  }
`
export const Loader = styled.div`
  margin: auto;
  width: 3rem;
  height: 3rem;
  border-left-color: var(--orange-200);
  border-width: 5px;
`
export const HeroTextInput = styled(TextInput)`
  @media ${variables.device.tablet} {
    width: 100%;
    max-width: 100%;
  }
`
