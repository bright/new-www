import styled from 'styled-components'
import { CustomTextRegular, TextRegular, TextTitle } from '..'
import variables from '../../../styles/variables'
import Arrow from '../../../../static/images/arrow-select.svg'
import { Button as ButtonBase } from './../index'
import { clampBuilder } from '../../../helpers/clampBuilder'

export const Description = styled.div({
  fontSize: '18px',
  lineHeight: '40px',
  fontFamily: variables.font.text.family,

  marginTop: '55px',
})

export const Form = styled.form({
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

export const ErrorMessage = styled(SubmitMessage)({
  color: 'red',
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

export const ContainerWrapper = styled.div`
  @media ${variables.deviceWidthMin.mobile} {
      padding: 0 2.2rem 2.2rem;
  }
`

export const SuccesMessage = styled(CustomTextRegular)`
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
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

export const FormGrid = styled.div`
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    grid-template-areas: "header" "form" "image";
    
    @media ${variables.deviceWidthMin.mobile} {
        grid-template-columns: 1fr;
        grid-template-areas: "header" "image" "form" ;
    }

    @media ${variables.deviceWidthMin.tablet} {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "header header" "image form";
    }
`

export const FormHeader = styled.div`
    grid-area: header;
    padding: 0 1.25rem;
    
    @media ${variables.deviceWidthMin.mobile} {
        padding: 0;
    }
`

export const SubTitle = styled(TextRegular)`
    text-align: center;
`

export const ImageWrapper = styled.div`
    grid-area: image;
`

export const InputRow = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    @media ${variables.deviceWidthMin.mobile} {
        flex-wrap: nowrap;
    }
`

export const FormWrapper = styled.div`
    grid-area: form;
    padding: 0 1.25rem;

    @media ${variables.deviceWidthMin.mobile} {
        padding: 0;
    }
`

export const FormErrorMessage = styled(CustomTextRegular)`
  background: #e50000;
  color: #fff;
  padding: 1rem 1.5rem;
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
    text-align: center;
  }
`
