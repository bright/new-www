import { FormContainer } from "../about-us.styled"
import { Link } from "gatsby"
import { JobApplicationForm } from "../../forms/job-application/job-application-form"
import React from "react"

export function FormComponent() {
  return (
    <FormContainer>
      <h2>
        want to be part of a bright a story? drop us a line or check{" "}
        <Link to="/career">open positions</Link>
      </h2>
      <JobApplicationForm />
    </FormContainer>
  )
}
