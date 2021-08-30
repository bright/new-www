import React, { CSSProperties, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { FormProps, JobApplicationForm } from '../../forms/job-application/job-application-form'
import { FormContainer } from '../about-us.styled'
import { routeLinks } from '../../../config/routing'
import { TextRegular } from '../../shared'
import { SuccessMessage } from '../../shared/contact/styles'
import variables from '../../../styles/variables'
import { JobApplicationModal } from '../../forms/job-application/job-application-modal'
import { CustomTextRegular } from '../../shared/index.styled'

interface Props extends FormProps {
  title?: React.ReactNode
  description?: React.ReactNode
  className?: string
  style?: CSSProperties
}

const Title = styled.h2`
  margin-bottom: 3rem;
  margin-top: 2.6875rem;
  font-size: 2.5rem;
  text-align: center;

  @media ${variables.device.mobile} {
    margin-top: 2rem;
    font-size: 1.375rem;
    text-align: left;
  }
`

const Description = styled(TextRegular)`
  margin-bottom: 2rem;

  @media ${variables.device.mobile} {
    margin-bottom: 4rem;
    font-size: 1rem;
    text-align: left;
  }
`

const SuccesMessage = styled(CustomTextRegular)`
  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`

export const FormComponent: React.FC<Props> = props => {
  const [success, setSuccess] = useState(false)

  const closeModal = () => {
    setSuccess(false)
  }

  const {
    style,
    className,
    title = (
      <>
        want to be part of a bright a story? drop us a line or check <Link to={routeLinks.career}>open positions</Link>
      </>
    ),
    description,
    ...formProps
  } = props
  return (
    <FormContainer style={style} className={className}>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      <JobApplicationForm {...formProps} onSubmit={() => setSuccess(true)} />
      {success && (
        <JobApplicationModal modalState={success} closeModal={closeModal} title={'Thanks for submitting'}>
          <SuccesMessage>
            Congrats! Your application was successfully submitted. You’ll receive email with the confirmation. Thank
            you!
          </SuccesMessage>
        </JobApplicationModal>
      )}
    </FormContainer>
  )
}
