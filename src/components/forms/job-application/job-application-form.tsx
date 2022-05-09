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

export const JobApplicationForm: React.FC<FormProps> = props => {
  const { value, handleChange, handleSubmit, setIsSubmitedToFalse } = useApplicationForm()
  const [errorMsgValidation, setErrorMsgValidation] = useState<string>('')

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

  const submit = useCallback((event, data) => {
    trackCustomEvent({
      category: 'Recruitment Contact Form Button',
      action: 'Click Submit Recruitment Form',
      label: window.location.href,
    })
    event.preventDefault()
    if (!data.cv) {
      setErrorMsgValidation('Please upload document to submit your application.')
      setTimeout(() => {
        setErrorMsgValidation('')
      }, 5000)
      return
    }
    onSubmit && onSubmit()

    handleSubmit(event, data)
  }, [])

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
          <p>Upload your resume / CV / cover letter / portfolio</p>
          <UploadField onChange={handleChange} name='cv' onClick={e => (e.target.value = null)}>
            <UploadIcon />
            {uploadLabel}
          </UploadField>
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
