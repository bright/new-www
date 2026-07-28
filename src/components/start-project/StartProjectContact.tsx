import React, { useState, FC, useRef } from 'react'

import { routeLinks } from '../../config/routing'

import { FormType, sendMail } from '../../helpers/mail'
import { FRAMNA_URLS } from '../../framna-redirects'

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
import { Link } from '../shared/SiteLink'
import ReCAPTCHA from 'react-google-recaptcha'
import { isReCaptchaValid } from '../recaptcha/recaptcha-verification'
import ReCaptcha from '../recaptcha/ReCaptcha'

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

  const [error, setError] = useState(false)

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const checkValid = (): boolean => {
    return checkedRules && name && email ? true : false
  }

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSending(true)

    e.preventDefault()

    if (!checkValid() || !await isReCaptchaValid(recaptchaRef)) {
      return
    }
    setIsSending(true)
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

    uet_report_conversion()

    trackCustomEvent({
      category: formButton,
      eventName: actionFormButton,
      label: window.location.href,
    })
  }

  const closeModal = () => {
    setSuccess(false)
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

          <Label>Message</Label>
          <IdeaTextArea
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={5000}
            placeholder='Let us know what you need help with'
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
              and agree to receive communications from Bright Inventions.
            </span>
          </PrivacyPolicyCheckboxContainer>

          {isSending ? (
            <Loader className='loader'></Loader>
          ) : (
              <MoreButton isSubmit isBlack marginTop='32px'>
              send
            </MoreButton>
          )}
          <div>
            <ContactTextRegular>
              or drop us a line via <a href={FRAMNA_URLS.contact}>get in touch</a>
            </ContactTextRegular>
          </div>
          <ReCaptcha recaptchaRef={recaptchaRef} />
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
            <p>Your form wasn’t submitted. Please try again.</p>
          </ErrorMessage>
        )}
      </Container>
    </ContainerWrapper>
  )
}

export default StartProjectContact
