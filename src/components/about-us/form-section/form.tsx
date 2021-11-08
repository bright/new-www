import React, { CSSProperties, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { FormProps, JobApplicationForm } from '../../forms/job-application/job-application-form'
import { FormContainer } from '../about-us.styled'
import { routeLinks } from '../../../config/routing'
import { TextRegular } from '../../shared'
import variables from '../../../styles/variables'

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

  @media ${variables.device.laptop} {
    font-size: 2.125rem;
  }

  @media ${variables.device.mobile} {
    margin-top: 2rem;
    font-size: 1.375rem;
    text-align: left;
  }
`

const Description = styled(TextRegular)`
  margin-bottom: 2rem;
  @media ${variables.device.laptop} {
    font-size: 1.25rem;
  }
  @media ${variables.device.mobile} {
    margin-bottom: 4rem;
    font-size: 1rem;
    text-align: left;
  }
`

export const FormComponent: React.FC<Props> = props => {
  const [success, setSuccess] = useState(false)

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
    </FormContainer>
  )
}
