import React, { ChangeEvent, useCallback, useState } from 'react'
import { FlexWrapper, MoreButton } from '../../shared'
import styled from 'styled-components'
import { TextField } from '../../forms/fields/text-field'
import { CheckboxField } from '../../forms/fields/checkbox-field'
import { Link } from 'gatsby'
import { routeLinks } from '../../../config/routing'
import variables from '../../../styles/variables'
import { clampBuilder } from './../../../helpers/clampBuilder'
import { EbookFormValue } from '../../utils/ebook-form/use-ebook-form'
import { ErrorMessage } from '../../shared/contact/styles'

const ContactEbookLink = styled(Link)`
  padding: 0 0 3px;
  border-bottom: 1px solid ${variables.color.text};
  color: inherit;
  font-weight: 700;
`
const ContactEbookCheckBoxField = styled.div`
  & label {
    & label {
      width: 100%;
      height: 24px;
      max-width: 24px;
      margin-right: ${variables.pxToRem(16)};
      background: ${variables.color.white};
    }
    & span {
      font-size: ${variables.pxToRem(16)};
      font-weight: 500;
      line-height: ${variables.pxToRem(40)};
    }
  }
  @media ${variables.device.mobile} {
    & label {
      & span {
        font-size: ${clampBuilder(320, 581, 13, 16)};
      }
    }
  }
`
const ContactEbookForm = styled.form`
  padding: ${variables.pxToRem(48)} 0 0;

  @media ${variables.device.tabletXL} {
    padding: ${variables.pxToRem(16)} 0 0;
  }
  @media ${variables.device.tablet} {
    padding: ${variables.pxToRem(48)} 0 0;
  }
`
const MoreButtonWrapper = styled.div`
  & button {
    @media ${variables.device.tabletXL} {
      margin-top: ${variables.pxToRem(16)};
    }
    @media ${variables.device.tablet} {
      margin-top: ${variables.pxToRem(48)};
    }
  }
`
export interface ContactEbookProps {
  setEmail: (email: string) => void
  setName: (name: string) => void
  handleSubmit: (event: any) => void
  setPolicy: (policy: boolean) => void
  value: EbookFormValue
}
export const ContactEbook: React.FC<ContactEbookProps> = ({ setEmail, setName, handleSubmit, setPolicy, value }) => {
  const onNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value)
    },
    [setName]
  )

  const onEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPolicy(event.target.checked)
    },
    [setPolicy]
  )

  return (
    <ContactEbookForm onSubmit={e => handleSubmit(e)}>
      <FlexWrapper desktopDirection='column' desktopGap='8px'>
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
          <CheckboxField required checked={value.policy} onChange={handleChange} name='policy'>
            I accept the <ContactEbookLink to={routeLinks.privacyPolicy}>Privacy Policy</ContactEbookLink> and agree to
            receive communication from bright inventions. *
          </CheckboxField>
        </ContactEbookCheckBoxField>

        <MoreButtonWrapper>
          <ErrorMessage>{value.errorMsg && value.errorMsg}</ErrorMessage>

          <MoreButton isSubmit isBlack>
            get your free copy
          </MoreButton>
        </MoreButtonWrapper>
      </FlexWrapper>
    </ContactEbookForm>
  )
}
