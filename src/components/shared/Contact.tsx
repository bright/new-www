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
              &nbsp;I accept the&nbsp;
            </CheckboxFieldContainer>
            {/* &nbsp;I accept the&nbsp; */}
            <a href={routeLinks.privacyPolicy} target='_blank' className='has-text-black'>
              <b>
                <u>Privacy Policy</u>
              </b>
            </a>{' '}
            *
          </PrivacyPolicyCheckboxContainer>

          <RequiredMessage>*fields required</RequiredMessage>

          {isSending ? (
            <Loader className='loader'></Loader>
          ) : (
            <MoreButton isSubmit onClick={checkValid} isBlack>
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
