import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextField } from '../fields/text-field'
import { Form } from './job-application-form.styled'
import { UploadField } from '../fields/upload-field'
import { CheckboxField } from '../fields/checkbox-field'
import { Link } from 'gatsby'
import { useApplicationForm } from './utils'
import { routeLinks } from '../../../config/routing'
import { UploadIcon } from '../../icons/Upload.icon'
import { AttachmentUploaded } from '../fields/fields.styled'
import { JobApplicationModal } from './job-application-modal'
import { CustomTextRegular, MoreButton } from '../../shared'
import variables from '../../../styles/variables'
import { trackConversion, trackCustomEvent } from '../../../analytics/track-custom-event'
import { FlexWrapper } from '../../shared'
import { JobFormData } from '../../../helpers/mail'

export interface FormProps {
  nameLabel?: string
  namePlaceholder?: string
  mailLabel?: string
  mailPlaceholder?: string
  textLabel?: string
  textPlaceholder?: string
  uploadLabel?: string
  onSubmit?: () => void
}

const SuccesMessage = styled(CustomTextRegular)`
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`

const ErrorMessage = styled(CustomTextRegular)`
  background: #e50000;
  color: #fff;
  padding: 1rem 1.5rem;
  text-align: center;
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`
const Loader = styled.div`
  margin: auto;
  width: 3rem;
  height: 3rem;
  border-left-color: var(--orange-200);
  border-width: 5px;
`
const Label = styled.label`
  display: flex;
  align-items: center;
  color: #888888;
  opacity: 1;
  font-family: ${variables.font.text.family};
  font-size: ${variables.pxToRem(20)};
  line-height: ${variables.pxToRem(24)};
  font-weight: 600;
  gap: ${variables.pxToRem(20)};

  input[type='radio'] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
    width: 40px;
    height: 40px;
    font: inherit;
    box-shadow: 0px 10px 18px #0000001f;
    border: 1px solid #888888;
    color: #888888;
    opacity: 0.66;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;

    &::before {
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      background: ${variables.color.primary} 0% 0% no-repeat padding-box;
    }

    &:checked {
      border: 1px solid ${variables.color.primary};
      color: #0a0a0a;
      opacity: 1;
    }

    &:checked::before {
      transform: scale(1);
    }
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(19)};
    input[type='radio'] {
      width: 34.43px;
      height: 34.43px;

      &::before {
        width: 17.21px;
        height: 17.21px;
      }
    }
  }
`
const AttachmentLabel = styled.p`
  font-size: ${variables.pxToRem(16)};
  line-height: ${variables.pxToRem(40)};
  font-family: ${variables.font.text.family};
`

export const JobApplicationForm: React.FC<FormProps> = props => {
  const {
    value,
    handleChange,
    handleSubmit,
    setIsSubmitedToFalse,
    setAttachments,
    setEmail,
    setName,
    setLinkedinUrl,
    removeAttachmentAtIndex,
  } = useApplicationForm()
  const [errorMsgValidation, setErrorMsgValidation] = useState<string>('')
  const [selectedAttachment, setSelectedAttachment] = useState<string>('cv')

  const { nameLabel, namePlaceholder, mailLabel, mailPlaceholder, uploadLabel, onSubmit } = props

  useEffect(() => {
    console.debug('value=', value)
  }, [value])

  const onCVInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || [])

      if (value.attachments.concat(files).length > 2) {
        setErrorMsgValidation('Please upload maximum two attachments.')
        setTimeout(() => {
          setErrorMsgValidation('')
        }, 5000)
        return
      }
      setAttachments(value.attachments.concat(files))
    },
    [setAttachments]
  )

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

  const onLinkedinUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLinkedinUrl(event.target.value)
    },
    [setLinkedinUrl]
  )

  const onRemoveAttachmentAtIndexClicked = useCallback(
    (event: SyntheticEvent, index: number) => {
      event.preventDefault()
      removeAttachmentAtIndex(index)
    },
    [removeAttachmentAtIndex]
  )

  const closeModal = () => {
    setIsSubmitedToFalse()
  }

  const submit = useCallback(
    (event: React.FormEvent<HTMLFormElement>, data: JobFormData) => {
      const isValidLinkedin =
        (data.message ?? '').startsWith('https://www.linkedin.com/') ||
        (data.message ?? '').startsWith('http://www.linkedin.com/') ||
        (data.message ?? '').startsWith('https://linkedin.com/')

      event.preventDefault()
      if (selectedAttachment === 'cv' && !data.attachments.length) {
        setErrorMsgValidation('Please upload document to submit your application.')
        setTimeout(() => {
          setErrorMsgValidation('')
        }, 5000)
        return
      } else if (selectedAttachment === 'linkedin' && !data.message) {
        setErrorMsgValidation('Please submit the link to your LinkedIn profile.')
        setTimeout(() => {
          setErrorMsgValidation('')
        }, 5000)
        return
      } else if (selectedAttachment === 'linkedin' && data.message && !isValidLinkedin) {
        setErrorMsgValidation('Please submit the  valid link to your LinkedIn profile.')
        setTimeout(() => {
          setErrorMsgValidation('')
        }, 5000)
        return
      }
      onSubmit && onSubmit()
      handleSubmit(event, data)
      trackCustomEvent({
        category: 'Recruitment Contact Form Button',
        eventName: 'Click Submit Recruitment Form',
        label: window.location.href,
      })

      trackConversion({
        sent_to: 'AW-10942749476/L-INCLP4yOQDEKS29OEo',
      }).then(() => console.log('Job contact form conversion sent'))
    },
    [selectedAttachment]
  )

  const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setSelectedAttachment(value)
    if (value !== 'cv') {
      setAttachments([])
    }
  }

  return (
    <>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submit(e, value)}>
        <div>
          <TextField
            required
            label={nameLabel || 'Name'}
            placeholder={namePlaceholder || 'John Doe'}
            value={value.name}
            onChange={onNameChange}
            name='name'
          />
          <TextField
            required
            label={mailLabel || 'Email'}
            placeholder={mailPlaceholder || 'example@email.com'}
            value={value.email}
            onChange={onEmailChange}
            name='email'
            type='email'
          />
        </div>
        <FlexWrapper desktopContent='space-between' mobileDirection='column' mobileGap='48px'>
          <Label className={selectedAttachment == 'cv' ? 'isBlack' : ''}>
            <input type='radio' value='cv' checked={selectedAttachment == 'cv'} onChange={handleChangeRadio} /> I want
            to submit my CV
          </Label>
          <Label className={selectedAttachment == 'linkedin' ? 'isBlack' : ''}>
            <input
              type='radio'
              value='linkedin'
              checked={selectedAttachment == 'linkedin'}
              onChange={handleChangeRadio}
            />{' '}
            I want to submit my LinkedIn profile
          </Label>
        </FlexWrapper>
        {/* <TextField
        required
        label={textLabel || 'Cover Letter'}
        placeholder={textPlaceholder || 'Additional information about you...'}
        value={value.message}
        onChange={handleChange}
        name="message"
        multiline
      /> */}
        <div>
          {selectedAttachment == 'cv' && (
            <div>
              <AttachmentLabel>Upload your resume / portfolio (up to 2 files – PDF or docx).</AttachmentLabel>
              <UploadField
                onChange={onCVInputChange}
                accept='application/msword, application/pdf, .doc, .docx, .dot, .dotm, .dotx'
                multiple
                name='cv'
                onClick={e => ((e.target! as HTMLInputElement).value = '')}
              >
                <UploadIcon />
                {uploadLabel}
              </UploadField>
            </div>
          )}
          {selectedAttachment == 'linkedin' && (
            <TextField
              required
              label={nameLabel || 'Paste link to your LinkedIn profile here'}
              placeholder={'Paste here'}
              value={value.message}
              onChange={onLinkedinUrlChange}
              name='message'
              type='url'
            />
          )}

          <div>
            {value.attachments.map((attachment, ix) => (
              <AttachmentUploaded key={ix}>
                <span>{attachment.name}</span> <button onClick={e => onRemoveAttachmentAtIndexClicked(e, ix)}>x</button>
              </AttachmentUploaded>
            ))}
          </div>
          {errorMsgValidation && <ErrorMessage>{errorMsgValidation}</ErrorMessage>}
        </div>
        <CheckboxField required checked={value.policy} onChange={handleChange} name='policy'>
          I accept the{' '}
          <strong>
            <Link to={routeLinks.privacyPolicy}>Privacy Policy</Link>
          </strong>
        </CheckboxField>
        {value.isSending ? (
          <Loader className='loader'></Loader>
        ) : (
          <MoreButton className='job-button' isSubmit isBlack marginTop='0'>
            submit
          </MoreButton>
        )}

        {value.isError && (
          <ErrorMessage>
            <p>Your application wasn’t submitted. Please try again.</p>
          </ErrorMessage>
        )}
      </Form>

      {value.isSubmitted && (
        <JobApplicationModal
          modalState={value.isSubmitted}
          closeModal={closeModal}
          title={'Thanks for submitting'}
          link='/career'
          linkLabel='back to career'
        >
          <SuccesMessage>Congrats! Your application was successfully submitted.</SuccesMessage>
        </JobApplicationModal>
      )}
    </>
  )
}
