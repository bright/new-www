import React, { useState, FC } from 'react'
import { routeLinks } from '../../config/routing'
import { FormType, sendMail } from '../../helpers/mail'
import { deviceSize } from '../../styles/variables'
import { JobApplicationModal } from '../forms/job-application/job-application-modal'
import {
  CheckboxFieldContainer,
  ContactTextRegular, ContainerWrapper,
  DoubleInputsRowEntry,
  Form, FormGrid, FormWrapper, HeroTextInput,
  IdeaTextArea, ImageWrapper, InputRow,
  Label, Loader,
  PrivacyPolicyCheckbox,
  PrivacyPolicyCheckboxContainer, SubTitle, SuccesMessage,
  FormHeader, FormErrorMessage
} from './contact/styles'
import { CustomSectionTitle, MoreButton } from './index'
import { trackConversion, trackCustomEvent } from '../../analytics/track-custom-event'
import { TickIcon } from '../icons/Tick.icon'
import { useTranslation } from 'react-i18next'
import { RoundedImage } from '../../our-services/Studio.styled'
import { StaticImage } from 'gatsby-plugin-image'
import { useWindowSize } from '../utils/use-windowsize'
import { useClient } from '../../hooks/useClient'

export interface ContactProps {
  title?: string
  subtitle?: string
  formButton: string
  actionFormButton: string
}

export const Contact: FC<ContactProps> = ({
  title,
  subtitle,
  formButton,
  actionFormButton,
}) => {
  const { t } = useTranslation(['contact', 'placeholder', 'button', 'other copy'])
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [message, setMessage] = useState<string>('')

  const [checkedRules, setCheckedRules] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [error, setError] = useState(false)

  const { width } = useWindowSize()
  const isClient = useClient()

  const checkValid = (): boolean => {
    return checkedRules && name && email ? true : false
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSending(true)

    e.preventDefault()

    if (!checkValid()) {
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
    <ContainerWrapper id='contactForm'>
      <FormGrid>
        <FormHeader>
          <CustomSectionTitle margin='0'
                              mobileMargin='3.5rem 0 2.25rem'
                              laptopMargin='3.5rem 0 2.25rem'
                              tabletMargin='3.5rem 0 2.25rem'
                              tabletXLMargin='3.5rem 0 2.25rem'>{title || 'let’s talk about your product idea'}</CustomSectionTitle>
          <SubTitle>{subtitle || `Fill out the form below and we'll get back to you in 48 hours.`}</SubTitle>
        </FormHeader>

        <ImageWrapper>
          <RoundedImage off={(width < deviceSize.mobile) || !isClient}>
            <StaticImage src='../../../static/images/gdansk/gdansk_contact.jpg' alt='Contact in Gdańsk' />
          </RoundedImage>
        </ImageWrapper>

        <FormWrapper>
          <Form data-form-type='contact' action='#' onSubmit={onFormSubmit}>
            <InputRow>
              <DoubleInputsRowEntry leftSide>
                <Label>{t('Name *', { ns: 'contact' })}</Label>
                <HeroTextInput
                  type='text'
                  maxLength={256}
                  name='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('Enter name / company here', { ns: 'placeholders' })}
                  required
                />
              </DoubleInputsRowEntry>

              <DoubleInputsRowEntry>
                <Label>{t('Email *', { ns: 'contact' })}</Label>
                <HeroTextInput
                  type='email'
                  maxLength={256}
                  name='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('name@company.com', { ns: 'placeholders' })}
                  required
                />
              </DoubleInputsRowEntry>
            </InputRow>

            <Label>{t('Your Idea', { ns: 'contact' })}</Label>
            <IdeaTextArea
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
              maxLength={5000}
              placeholder={t('Describe your project', { ns: 'placeholders' })}
              className={message ? 'isSelected' : ''}
            />

            <PrivacyPolicyCheckboxContainer>
              <CheckboxFieldContainer htmlFor={'accept-policy'}>
                <PrivacyPolicyCheckbox
                  type='checkbox'
                  name='accept-policy'
                  value='yes'
                  required
                  onChange={e => setCheckedRules(e.currentTarget.checked)}
                  checked={checkedRules}
                  id={'accept-policy'}
                />
                <label>
                  <TickIcon />
                </label>

              </CheckboxFieldContainer>
              <span>{t('I accept the', { ns: 'other copy' })}{' '}
                <a href={routeLinks.privacyPolicy} target='_blank' className='has-text-black'>
              <b>
                <u>{t('Privacy Policy', { ns: 'other copy' })}</u>
              </b>
            </a>{' '}
                {t('and agree to receive communications from Bright Inventions.', { ns: 'other copy' })}</span>
            </PrivacyPolicyCheckboxContainer>

            {isSending ? (
              <Loader className='loader'></Loader>
            ) : (
              <MoreButton isSubmit isBlack>
                {t('let’s talk', { ns: 'button' })}
              </MoreButton>
            )}
            <div>
              <ContactTextRegular style={{ marginTop: '32px' }}>
                {t('or drop us a line via', { ns: 'other copy' })}{' '}
                <a href='mailto:info@bright.dev?subject=bright%20mail'>info@bright.dev</a>
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
            <FormErrorMessage>
              <p>Your application wasn’t submitted. Please try again.</p>
            </FormErrorMessage>
          )}
        </FormWrapper>
      </FormGrid>
    </ContainerWrapper>
  )
}
