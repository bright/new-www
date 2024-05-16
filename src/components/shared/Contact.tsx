import React, { useState, FC } from 'react'
import styled from 'styled-components'
import { routeLinks } from '../../config/routing'
import { FormType, sendMail } from '../../helpers/mail'
import variables from '../../styles/variables'
import { JobApplicationModal } from '../forms/job-application/job-application-modal'
import {
  CheckboxFieldContainer,
  ContactTextRegular,
  DoubleInputsRow,
  DoubleInputsRowEntry,
  Form,
  IdeaTextArea,
  Label,
  PrivacyPolicyCheckbox,
  PrivacyPolicyCheckboxContainer,
  RequiredMessage,
  TextInput,
} from './contact/styles'
import { TextRegular, CustomSectionTitle, MoreButton } from './index'
import { CustomTextRegular } from './index.styled'
import { trackConversion, trackCustomEvent } from '../../analytics/track-custom-event'
import { TickIcon } from '../icons/Tick.icon'
import { useTranslation } from 'react-i18next'

const ContainerWrapper = styled.div<{ isOurServiceTemplate: boolean }>`
  display: flex;
  justify-content: center;
  flex-basis: unset;
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

export interface ContactProps {
  title?: string
  subtitle?: string
  isOurServiceTemplate?: boolean

  formButton: string
  actionFormButton: string
}

export const Contact: FC<ContactProps> = ({
  title,
  subtitle,
  isOurServiceTemplate = true,

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
          </DoubleInputsRow>

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
          <ErrorMessage>
            <p>Your application wasn’t submitted. Please try again.</p>
          </ErrorMessage>
        )}
        {/* {success && <SuccessMessage>Thank you! Your submission has been received!</SuccessMessage>} */}
        {/* {validationError && <ErrorMessage>Please, complete missing information</ErrorMessage>} */}
        {/* {error && <ErrorMessage>Oops! Something went wrong while submitting the form.</ErrorMessage>} */}
      </Container>
    </ContainerWrapper>
  )
}
