import { useCallback, useState } from 'react'
import { FormType, JobFormData, sendMail } from '../../../helpers/mail'

export function useApplicationForm() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    message: '',
    policy: false,
    isError: false,
    isSubmitted: false,
    isSending: false,
    linkedinlink: '',
    attachments: [] as File[]
  })
  const handleSubmit = (event: Event, data: JobFormData) => {
    setValue(state => ({
      ...state,
      isSending: true
    }))
    event.preventDefault()
    sendMail(data, FormType.job)
      .then(res => {
        setValue(state => ({
          ...state,
          isSubmitted: true,
          isSending: false
        }))
      })
      .catch(err => {
        console.error('Error submitting job application', err)
        setValue(state => ({
          ...state,
          isError: true,
          isSending: false
        }))
      })
  }

  const setIsSubmitedToFalse = () => {
    setValue(state => ({
      ...state,
      isSubmitted: false
    }))
  }

  const handleChange = useCallback(event => {
    event.persist()
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.type === 'file'
          ? event.target.files
          : event.target.value

    if (event.target.name == 'clearCv') {
      setValue(state => ({
        ...state,
        cv: null
      }))
    } else {
      setValue(state => {
        return {
          ...state,
          [event.target.name]: value
        }
      })
    }
  }, [])

  function setAttachments(files: File[]) {
    setValue({
      ...value,
      attachments: files
    })
  }

  function setEmail(email: string) {
    setValue({
      ...value,
      email
    })
  }

  function setName(name: string) {
    setValue({
      ...value,
      name
    })
  }

  function setLinkedinUrl(url: string) {
    setValue({
      ...value,
      message: url
    })
  }

  function removeAttachmentAtIndex(indexToRemove: number) {
    if (indexToRemove < value.attachments.length) {
      setValue({
        ...value,
        attachments: value.attachments.filter((_, ix) => ix !== indexToRemove)
      })
    }
  }

  return {
    value,
    handleChange,
    handleSubmit,
    setIsSubmitedToFalse,
    setAttachments,
    setEmail,
    setName,
    setLinkedinUrl,
    removeAttachmentAtIndex
  }
}
