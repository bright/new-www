import React from "react"
import { TextField } from "../fields/text-field"
import { Form } from "./job-application-form.styled"
import { BlackButton } from "../../about-us/about-us.styled"
import { UploadField } from "../fields/upload-field"
import { CheckboxField } from "../fields/checkbox-field"
import { Link } from "gatsby"
import { useApplicationForm } from "./utils"
import { routeLinks } from '../../../config/routing'

export function JobApplicationForm() {
  const { value, handleChange, handleSubmit } = useApplicationForm()
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          label="Name"
          placeholder="John Doe"
          value={value.name}
          onChange={handleChange}
          name="name"
        />
        <TextField
          required
          label="Email"
          placeholder="example@email.com"
          value={value.email}
          onChange={handleChange}
          name="email"
        />
      </div>
      <TextField
        required
        label="Cover Letter"
        placeholder="Additional information about you..."
        value={value.message}
        onChange={handleChange}
        name="message"
        multiline
      />
      <UploadField required onChange={handleChange} name="cv" />
      <CheckboxField
        required
        checked={value.policy}
        onChange={handleChange}
        name="policy"
      >
        I accept the{" "}
        <strong>
          <Link to={routeLinks.privacyPolicy}>Privacy Policy</Link>
        </strong>
      </CheckboxField>
      <BlackButton type="submit">submit</BlackButton>
    </Form>
  )
}
