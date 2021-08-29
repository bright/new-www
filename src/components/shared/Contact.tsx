import React, { useState } from 'react'
import styled from 'styled-components'
import { routeLinks } from '../../config/routing'
import { FormType, sendMail } from '../../helpers/mail'
import {
  DoubleInputsRow,
  DoubleInputsRowEntry,
  ErrorMessage,
  Form,
  IdeaTextArea,
  Label,
  PrivacyPolicyCheckbox,
  PrivacyPolicyCheckboxContainer,
  RequiredMessage,
  SingleSelect,
  SubmitButton,
  SuccessMessage,
  TextInput,
} from './contact/styles'
import { TextRegular, CustomSectionTitle } from './index'

const ContainerWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '105px',

  padding: '0 20px',
})

const Container = styled.div({
  maxWidth: '995px',
  display: 'flex',
  flexDirection: 'column',
})

export const Contact = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [phone, setPhone] = useState<string>('')
  const [budget, setBudget] = useState<string>('')

  const [service, setService] = useState<string>('DEFAULT')
  const [message, setMessage] = useState<string>('')

  const [source, setSource] = useState<string>('DEFAULT')

  const [checkedRules, setCheckedRules] = useState(false)

  const [success, setSuccess] = useState(false)
  const [valid, setValid] = useState<boolean>()
  const [error, setError] = useState(false)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const wrapValue = (value: any) => ({
      value,
    })
    sendMail(
      {
        name: wrapValue(name),
        phone: wrapValue(phone),
        email: wrapValue(email),
        source: wrapValue(source),
        message: wrapValue(message),
      },
      FormType.contact
    )
      .then(() => {
        setError(false)
        setSuccess(true)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setSuccess(false)
      })
  }

  const checkValid = () => {
    setValid(!(checkedRules && name && email && message))
  }

  return (
    <ContainerWrapper>
      <Container>
        <CustomSectionTitle>let’s talk about your product idea</CustomSectionTitle>
        <TextRegular>
          Have an idea for a groundbreaking software project, but don't know where to start? Or maybe you're looking for
          software development experts to help take your product to the next level? We'll be more than happy to discuss
          how we can help your business succeed!
        </TextRegular>

        <Form data-form-type='contact' action='#' onSubmit={onFormSubmit}>
          <DoubleInputsRow>
            <DoubleInputsRowEntry leftSide>
              <Label>Name / Company *</Label>
              <TextInput
                type='text'
                maxLength={256}
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Enter name here'
                required
              />
            </DoubleInputsRowEntry>

            <DoubleInputsRowEntry>
              <Label>Email *</Label>
              <TextInput
                type='email'
                maxLength={256}
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='name@company.com'
                required
              />
            </DoubleInputsRowEntry>
          </DoubleInputsRow>

          <DoubleInputsRow>
            <DoubleInputsRowEntry leftSide>
              <Label>Phone *</Label>
              <TextInput
                type='text'
                maxLength={256}
                name='phone'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder='(+55) 555 555 555'
                required
              />
            </DoubleInputsRowEntry>

            <DoubleInputsRowEntry>
              <Label>Service</Label>
              <SingleSelect name='service' value={service} onChange={e => setService(e.target.value)}>
                <option value='DEFAULT' hidden>
                  Pick what service you need
                </option>
                <option value='web_development'>web development</option>
                <option value='mobile_app_development'>mobile app development</option>
                <option value='product_design'>product design</option>
                <option value='blockchain'>blockchain</option>
                <option value='custom_software_development'>custom software development</option>
                <option value='agile_workshops'>agile workshops</option>
                <option value='other'>other</option>
              </SingleSelect>
            </DoubleInputsRowEntry>
          </DoubleInputsRow>

          <Label>Idea / Project *</Label>
          <IdeaTextArea
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={5000}
            placeholder='Describe your project'
            required
          />

          <Label>How did you find out about us?</Label>
          <SingleSelect
            name='source'
            value={source}
            onChange={e => setSource(e.target.value)}
            style={{ width: '100%', maxWidth: '445px' }}
          >
            <option value='DEFAULT' hidden>
              Select how did you find about us
            </option>

            <option value='social_media'>Social media (LinkedIn, Facebook, Instagram)</option>
            <option value='referral'>Referral</option>
            <option value='google'>Google</option>
            <option value='other'>other</option>
          </SingleSelect>

          <PrivacyPolicyCheckboxContainer>
            <PrivacyPolicyCheckbox
              type='checkbox'
              name='accept-policy'
              value='yes'
              required
              onChange={e => setCheckedRules(e.currentTarget.checked)}
              checked={checkedRules}
            />
            &nbsp;I accept the&nbsp;
            <a href={routeLinks.privacyPolicy} target='_blank' className='has-text-black'>
              <b>
                <u>Privacy Policy</u>
              </b>
            </a>{' '}
            *
          </PrivacyPolicyCheckboxContainer>

          <RequiredMessage>* - fields required</RequiredMessage>

          <SubmitButton type='submit' onClick={checkValid}>
            submit
          </SubmitButton>
        </Form>

        {success && <SuccessMessage>Thank you! Your submission has been received!</SuccessMessage>}
        {valid === false && <ErrorMessage>Please, complete missing information</ErrorMessage>}
        {error && <ErrorMessage>Oops! Something went wrong while submitting the form.</ErrorMessage>}
      </Container>
    </ContainerWrapper>
  )
}
