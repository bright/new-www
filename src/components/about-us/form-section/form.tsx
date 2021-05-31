import React from "react"
import { FormContainer } from "../about-us.styled"
import { Link } from "gatsby"

import { JobApplicationForm } from "../../forms/job-application/job-application-form"
import { routeLinks } from "../../../config/routing"
import { TextRegular } from '../../shared'
import styled from 'styled-components'

interface Props {
  title?: React.ReactNode
  description?: React.ReactNode
}

const Title = styled.h2`
  margin-bottom: 3rem;
`

const Description = styled(TextRegular)`
  margin-bottom: 2rem;
`

export const FormComponent: React.FC<Props> = ({title = '', description}) => {

  return (
    <FormContainer>
      <Title>
        {title || (
          <>
            want to be part of a bright a story? drop us a line or check{" "}
            <Link to={routeLinks.career}>open positions</Link>
          </>
        )}
      </Title>
      {description && <Description>{description}</Description>}
      <JobApplicationForm />
    </FormContainer>
  )
}
