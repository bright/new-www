import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { TextField } from '../fields/text-field'
import { Form } from './job-application-form.styled'
import { BlackButton } from '../../about-us/about-us.styled'
import { UploadField } from '../fields/upload-field'
import { CheckboxField } from '../fields/checkbox-field'
import { Link } from 'gatsby'
import { useApplicationForm } from './utils'
import { routeLinks } from '../../../config/routing'
import { UploadIcon } from '../../icons/Upload.icon'
import { AttachmentUploaded } from '../fields/fields.styled'
import { JobApplicationModal } from './job-application-modal'
import { CustomTextRegular } from '../../shared'
import variables from '../../../styles/variables'
import { trackCustomEvent } from '../../../helpers/trackCustomEvent'
import { FlexWrapper } from './../../shared/index'

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
      background: #f7931e 0% 0% no-repeat padding-box;
    }
    &:checked {
      border: 1px solid #f7931e;
      color: #0a0a0a;
      opacity: 1;
    }
    & :checked::before {
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

export const JobApplicationForm: React.FC<FormProps> = props => {
  const { value, handleChange, handleSubmit, setIsSubmitedToFalse } = useApplicationForm()
  const [errorMsgValidation, setErrorMsgValidation] = useState<string>('')
  const [selectedAttachment, setSelectedAttachment] = useState<string>('cv')

  const {
    nameLabel,
    namePlaceholder,
    mailLabel,
    mailPlaceholder,
    textLabel,
    textPlaceholder,
    uploadLabel,
    onSubmit,
  } = props

  const closeModal = () => {
    setIsSubmitedToFalse()
  }

  const submit = useCallback(
    (event, data) => {
      trackCustomEvent({
        category: 'Recruitment Contact Form Button',
        action: 'Click Submit Recruitment Form',
        label: window.location.href,
      })
      const validLinkedinUrlRegex = RegExp(
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gm
      )
      const isValidLinkedin = validLinkedinUrlRegex.test(data.message)

      event.preventDefault()
      if (selectedAttachment === 'cv' && !data.cv) {
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
    },
    [selectedAttachment]
  )

  const handleChangeRadio = event => {
    const { value } = event.target

    setSelectedAttachment(value)
  }

  return (
    <>
      <Form onSubmit={e => submit(e, value)}>
        <div>
          <TextField
            required
            label={nameLabel || 'Name'}
            placeholder={namePlaceholder || 'John Doe'}
            value={value.name}
            onChange={handleChange}
            name='name'
          />
          <TextField
            required
            label={mailLabel || 'Email'}
            placeholder={mailPlaceholder || 'example@email.com'}
            value={value.email}
            onChange={handleChange}
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
              <p>Upload your resume / CV / cover letter / portfolio</p>
              <UploadField onChange={handleChange} name='cv' onClick={e => (e.target.value = null)}>
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
              onChange={handleChange}
              name='message'
            />
          )}

          <div>
            {value.cv && (
              <AttachmentUploaded>
                <span>{value.cv[0].name}</span>{' '}
                <button onClick={handleChange} name='clearCv'>
                  x
                </button>
              </AttachmentUploaded>
            )}
          </div>
          {errorMsgValidation && <ErrorMessage>{errorMsgValidation}</ErrorMessage>}
        </div>
        <CheckboxField required checked={value.policy} onChange={handleChange} name='policy'>
          I accept the{' '}
          <strong>
            <Link to={routeLinks.privacyPolicy}>Privacy Policy</Link>
          </strong>
        </CheckboxField>
        {value.isSending ? <Loader className='loader'></Loader> : <BlackButton type='submit'>submit</BlackButton>}

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
