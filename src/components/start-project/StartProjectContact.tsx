import React, { useState, FC } from 'react'

import { routeLinks } from '../../config/routing'

import { FormType, sendMail } from '../../helpers/mail'

import {
  CheckboxFieldContainer,
  DoubleInputsRow,
  DoubleInputsRowEntry,
  Form,
  IdeaTextArea,
  Label,
  PrivacyPolicyCheckbox,
  PrivacyPolicyCheckboxContainer,
  RequiredMessage,
  SuccesMessage,
  ContainerWrapper,
  Container,
  HeroTextInput,
  Loader,
  ErrorMessage,
  ContactTextRegular,
} from './start-project-contact.styled'

import { TextRegular } from '../shared'
import { trackConversion, trackCustomEvent } from '../../analytics/track-custom-event'

import { TickIcon } from '../icons/Tick.icon'
import { JobApplicationModal } from '../forms/job-application/job-application-modal'
import { MoreButton } from './../shared/index'
import { Link } from 'gatsby'

export interface StartProjectContactProps {
  formButton: string
  actionFormButton: string
}

const StartProjectContact: FC<StartProjectContactProps> = ({ formButton, actionFormButton }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [message, setMessage] = useState<string>('')

  const [checkedRules, setCheckedRules] = useState(false)

  const [success, setSuccess] = useState(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>()
  const [error, setError] = useState(false)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSending(true)

    e.preventDefault()

    sendMail(
      {
        name: name,
        email: email,
        message: message,
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

    trackConversion({
      sent_to: 'AW-10942749476/AYShCMDh58sDEKS29OEo',
    }).then(() => console.log('Business contact form conversion sent'))

    trackCustomEvent({
      category: formButton,
      eventName: actionFormButton,
      label: window.location.href,
    })
  }

  const closeModal = () => {
    setSuccess(false)
  }

  const checkValid = () => {
    const isValid: boolean = checkedRules && name && email ? true : false

    setValid(isValid)
  }

  return (
    <ContainerWrapper>
      <Container>
        <Form data-form-type='contact' action='#' onSubmit={onFormSubmit}>
          <DoubleInputsRow>
            <DoubleInputsRowEntry>
              <Label>Name *</Label>
              <HeroTextInput
                type='text'
                maxLength={256}
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Enter name / company here'
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

          <Label>Your Idea</Label>
          <IdeaTextArea
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={5000}
            placeholder='Describe your project'
            className={message ? 'isSelected' : ''}
          />

          <PrivacyPolicyCheckboxContainer>
            <CheckboxFieldContainer>
              <PrivacyPolicyCheckbox
                type='checkbox'
                name='accept-policy'
                value='yes'
                required
                onChange={e => setCheckedRules(e.currentTarget.checked)}
                checked={checkedRules}
              />
              <label htmlFor={'accept-policy'}>
                <TickIcon />
              </label>
            </CheckboxFieldContainer>
            <span>
              I accept the&nbsp;
              <strong>
                <Link to={routeLinks.privacyPolicy}>Privacy Policy</Link>
              </strong>{' '}
              *
            </span>
          </PrivacyPolicyCheckboxContainer>

          <RequiredMessage>*fields required</RequiredMessage>

          {isSending ? (
            <Loader className='loader'></Loader>
          ) : (
            <MoreButton isSubmit onClick={checkValid} isBlack marginTop='32px'>
              let’s talk
            </MoreButton>
          )}
          <div>
            <ContactTextRegular style={{ marginTop: '32px' }}>
              or drop us a line via{' '}
              <a href='mailto:info@brightinventions.pl?subject=bright%20mail'>info@brightinventions.pl</a>
            </ContactTextRegular>
          </div>
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

export default StartProjectContact
