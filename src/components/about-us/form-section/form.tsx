import React, { CSSProperties } from 'react'
import { FormContainer } from "../about-us.styled"
import { Link } from "gatsby"

import { FormProps, JobApplicationForm } from '../../forms/job-application/job-application-form'
import { routeLinks } from "../../../config/routing"
import { TextRegular } from '../../shared'
import styled from 'styled-components'

interface Props extends FormProps {
  title?: React.ReactNode
  description?: React.ReactNode
  className?: string
  style?: CSSProperties
}

const Title = styled.h2`
  margin-bottom: 3rem;
`

const Description = styled(TextRegular)`
  margin-bottom: 2rem;
`

export const FormComponent: React.FC<Props> = (props) => {
  const {
    style,
    className,
    title = (
      <>
        want to be part of a bright a story? drop us a line or check{" "}
        <Link to={routeLinks.career}>open positions</Link>
      </>
    ),
    description,
    ...formProps
  } = props
  return (
    <FormContainer style={style} className={className}>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      <JobApplicationForm {...formProps} />
    </FormContainer>
  )
}
