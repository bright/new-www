import React, { ChangeEvent, useCallback } from 'react'
import { CheckboxField } from './components/forms/fields/checkbox-field'
import { TextField } from './components/forms/fields/text-field'
import { routeLinks } from './config/routing'
import { EbookFormValue } from './components/utils/ebook-form/use-ebook-form'
import { Link } from 'gatsby'

import { FlexWrapper, TextRegular } from './components/shared'
import styled from 'styled-components'
import variables from './styles/variables'

const ContactEbookCheckBoxField = styled.div`
  & label {
    & label {
      border: 1px solid ${variables.color.lighterGrey};
      margin-right: ${variables.pxToRem(8)};
      max-width: ${variables.pxToRem(16)};
      height: ${variables.pxToRem(16)};
      background: ${variables.color.white};
    }
    & span {
      font-size: ${variables.pxToRem(10)};
      line-height: ${variables.pxToRem(20)};
      letter-spacing: -2%;
    }
  }
`

const EbookTextRegular = styled(TextRegular)`
  font-size: ${variables.pxToRem(18)};
  line-height: ${variables.pxToRem(40)};
  opacity: 95.2%;
`

const ContactEbookLink = styled(Link)`
  padding: 0 0 3px;
  border-bottom: 1px solid ${variables.color.text};
  color: inherit;
  font-weight: 700;
`

const EbookTextFieldWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${variables.pxToRem(16)};
  & label {
    color: ${variables.color.text};
    & input {
      border: 1px solid ${variables.color.lighterGrey};
      &::placeholder {
        color: ${variables.color.darkerGrey};
      }
    }
  }
`

export interface EbookDynamicFormProps {
  description: string
  setEmail: (email: string) => void
  setName: (name: string) => void
  handleSubmit: (event: any) => void
  setPolicy: (policy: boolean) => void
  value: EbookFormValue
  formRef: React.RefObject<HTMLFormElement>
}

export const EbookDynamicForm: React.FC<EbookDynamicFormProps> = ({
  description,
  setEmail,
  setName,
  setPolicy,
  handleSubmit,
  value,
  formRef,
}) => {
  const onEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  const onNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value)
    },
    [setName]
  )

  const onPolicyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPolicy(event.target.checked)
    },
    [setPolicy]
  )
  return (
    <React.Fragment>
      <FlexWrapper desktopDirection='column'>
        <EbookTextRegular>{description}</EbookTextRegular>
        <EbookTextFieldWrapper ref={formRef} onSubmit={e => handleSubmit(e)}>
          <TextField
            required
            label={'Name *'}
            placeholder={'enter your name here'}
            value={value.name}
            onChange={onNameChange}
            name='name'
          />
          <TextField
            required
            label={'Email *'}
            placeholder={'enter your email here'}
            value={value.email}
            onChange={onEmailChange}
            name='email'
            type='email'
          />

          <ContactEbookCheckBoxField>
            <CheckboxField required checked={value.policy} onChange={onPolicyChange} name='policy'>
              I accept the <ContactEbookLink to={routeLinks.privacyPolicy}>Privacy Policy</ContactEbookLink> and agree
              to receive communication from bright inventions. *
            </CheckboxField>
          </ContactEbookCheckBoxField>
        </EbookTextFieldWrapper>
      </FlexWrapper>
    </React.Fragment>
  )
}
