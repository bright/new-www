import React, { useState, FC } from 'react'
import styled from 'styled-components'
import { routeLinks } from '../../config/routing'
import { FormType, sendMail } from '../../helpers/mail'
import variables from '../../styles/variables'
import { JobApplicationModal } from '../forms/job-application/job-application-modal'
import {
  DoubleInputsRow,
  DoubleInputsRowEntry,
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
import { CustomTextRegular } from './index.styled'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

const ContainerWrapper = styled.div<{ isOurServiceTemplate: boolean }>`
  display: flex;
  justify-content: center;
  margin-bottom: 105px;
  padding: 0 18px;
  @media screen and (max-width: 768px) {
    padding: ${({ isOurServiceTemplate }) =>
      isOurServiceTemplate ? `0 ${variables.pxToRem(18)}` : `0 ${variables.pxToRem(36)}`};
  }
`

const Container = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;

  @media ${variables.device.laptop} {
    max-width: 800px;
  }
  @media ${variables.device.tabletXL} {
    max-width: 824px;
  }
`

const SuccesMessage = styled(CustomTextRegular)`
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`

const ErrorMessage = styled(CustomTextRegular)`
  background: #e50000;
  color: #fff;
  padding: 1rem 1.5rem;
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
    text-align: center;
  }
`
const Loader = styled.div`
  margin: auto;
  width: 3rem;
  height: 3rem;
  border-left-color: var(--orange-200);
  border-width: 5px;
`
const HeroTextInput = styled(TextInput)`
  @media ${variables.device.tablet} {
    width: 100%;
    max-width: 100%;
  }
`
const HeroSingleSelect = styled(SingleSelect)`
  max-width: 445px;
  @media ${variables.device.tablet} {
    width: 100%;
    max-width: 100%;
  }
`
export interface ContactProps {
  title?: string
  subtitle?: string
  isOurServiceTemplate?: boolean
}
export const Contact: FC<ContactProps> = ({ title, subtitle, isOurServiceTemplate = true }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [phone, setPhone] = useState<string>('')
  const [budget, setBudget] = useState<string>('')

  const [service, setService] = useState<string>('DEFAULT')
  const [message, setMessage] = useState<string>('')

  const [source, setSource] = useState<string>('DEFAULT')

  const [checkedRules, setCheckedRules] = useState(false)

  const [success, setSuccess] = useState(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>()
  const [error, setError] = useState(false)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSending(true)

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
        setIsSending(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setSuccess(false)
        setIsSending(false)
      })
  }

  const closeModal = () => {
    setSuccess(false)
  }

  const checkValid = () => {
    trackCustomEvent({
      category: 'Contact Form Button',
      action: 'Click',
      label: window.location.href,
    })
    const isValid: boolean = checkedRules && name && email && message ? true : false
    setValid(isValid)
  }

  return (
    <ContainerWrapper isOurServiceTemplate={isOurServiceTemplate!} id='contactForm'>
      <Container>
        {title ? (
          <CustomSectionTitle>{title}</CustomSectionTitle>
        ) : (
          <CustomSectionTitle>let’s talk about your product idea</CustomSectionTitle>
        )}
        {subtitle ? (
          <TextRegular>{subtitle}</TextRegular>
        ) : (
          <TextRegular>
            Have an idea for a groundbreaking software project, but don't know where to start? Or maybe you're looking
            for software development experts to help take your product to the next level? We'll be more than happy to
            discuss how we can help your business succeed!
          </TextRegular>
        )}

        <Form data-form-type='contact' action='#' onSubmit={onFormSubmit}>
          <DoubleInputsRow>
            <DoubleInputsRowEntry leftSide>
              <Label>Name / Company *</Label>
              <HeroTextInput
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
              <HeroTextInput
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
              <Label>Phone </Label>
              <HeroTextInput
                type='text'
                maxLength={256}
                name='phone'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder='(+55) 555 555 555'
              />
            </DoubleInputsRowEntry>

            <DoubleInputsRowEntry>
              <Label>Service</Label>
              <HeroSingleSelect name='service' value={service} onChange={e => setService(e.target.value)}>
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
              </HeroSingleSelect>
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
          <HeroSingleSelect
            name='source'
            value={source}
            onChange={e => setSource(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value='DEFAULT' hidden>
              Select how did you find about us
            </option>

            <option value='social_media'>Social media (LinkedIn, Facebook, Instagram)</option>
            <option value='referral'>Referral</option>
            <option value='google'>Google</option>
            <option value='other'>other</option>
          </HeroSingleSelect>

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

          {isSending ? (
            <Loader className='loader'></Loader>
          ) : (
            <SubmitButton type='submit' onClick={checkValid}>
              submit
            </SubmitButton>
          )}
        </Form>
        {success && (
          <JobApplicationModal
            modalState={success}
            closeModal={closeModal}
            title={'Thanks for submitting'}
            link='/'
            linkLabel='back to home page'
          >
            <SuccesMessage>
              Congrats! You have successfully submitted the form. We will get back to you asap.
            </SuccesMessage>
          </JobApplicationModal>
        )}
        {error && (
          <ErrorMessage>
            <p>Your application wasn’t submitted. Please try again.</p>
          </ErrorMessage>
        )}
        {/* {success && <SuccessMessage>Thank you! Your submission has been received!</SuccessMessage>} */}
        {valid === false && <ErrorMessage>Please, complete missing information</ErrorMessage>}
        {/* {error && <ErrorMessage>Oops! Something went wrong while submitting the form.</ErrorMessage>} */}
      </Container>
    </ContainerWrapper>
  )
}
