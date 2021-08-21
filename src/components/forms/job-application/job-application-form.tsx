import React, { useCallback } from 'react'
import { TextField } from '../fields/text-field'
import { Form } from './job-application-form.styled'
import { BlackButton } from '../../about-us/about-us.styled'
import { UploadField } from '../fields/upload-field'
import { CheckboxField } from '../fields/checkbox-field'
import { Link } from 'gatsby'
import { useApplicationForm } from './utils'
import { routeLinks } from '../../../config/routing'
import { UploadIcon } from '../../icons/Upload.icon'

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

export const JobApplicationForm: React.FC<FormProps> = props => {
  const { value, handleChange, handleSubmit } = useApplicationForm()
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

  const submit = useCallback(event => {
    event.preventDefault()
    onSubmit && onSubmit()
    handleSubmit(event)
  }, [])

  return (
    <Form onSubmit={submit}>
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
        <UploadField required onChange={handleChange} name='cv'>
          <UploadIcon />
          {uploadLabel}
        </UploadField>
        <div>
          {value.cv && (
            <div>
              value.cv[0].name <button onChange={handleChange}>x</button>
            </div>
          )}
        </div>
      </div>
      <CheckboxField required checked={value.policy} onChange={handleChange} name='policy'>
        I accept the{' '}
        <strong>
          <Link to={routeLinks.privacyPolicy}>Privacy Policy</Link>
        </strong>
      </CheckboxField>
      <BlackButton type='submit'>submit</BlackButton>
    </Form>
  )
}
