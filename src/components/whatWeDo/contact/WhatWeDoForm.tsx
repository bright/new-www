import React, { useState } from "react"
import styled from "styled-components"
import { FormType, sendMail } from "../../../helpers/mail"
import {
  Description,
  DoubleInputsRow,
  ErrorMessage,
  Form,
  Header,
  IdeaTextArea,
  Label,
  PrivacyPolicyCheckbox,
  PrivacyPolicyCheckboxContainer,
  SingleSelect,
  SubmitButton,
  SuccessMessage,
  TextInput,
} from "./styles"

const ContainerWrapper = styled.div({
  display: "flex",
  justifyContent: "center",

  marginTop: "185px",
  marginBottom: "185px",

  paddingLeft: "20px",
  paddingRight: "20px",

  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

const Container = styled.div({
  maxWidth: "955px",

  display: "flex",
  flexDirection: "column",

  color: "#131214",
})

const WhatWeDoForm = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const [phone, setPhone] = useState<string>("")
  const [budget, setBudget] = useState<string>("")

  const [service, setService] = useState<string>("DEFAULT")
  const [message, setMessage] = useState<string>("")

  const [source, setSource] = useState<string>("DEFAULT")

  const [checkedRules, setCheckedRules] = useState(false)

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const wrapValue = (value: any) => ({
      value,
    })
    sendMail(
      {
        name: wrapValue(name),
        phone: wrapValue(phone),
        email: wrapValue(email),
        budget: wrapValue(budget),
        source: wrapValue(source),
        message: wrapValue(message),
      },
      FormType.contact
    )
      .then(() => {
        setError(false)
        setSuccess(true)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setSuccess(false)
      })
  }

  return (
    <ContainerWrapper>
      <Container>
        <Header>let’s talk about your product idea</Header>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Description>

        <Form data-form-type="contact" action="#" onSubmit={onFormSubmit}>
          <DoubleInputsRow>
            <div style={{ marginRight: "64px" }}>
              <Label>Name / Company</Label>
              <TextInput
                type="text"
                maxLength={256}
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter name here"
                required
              />
            </div>

            <div>
              <Label>Email</Label>
              <TextInput
                type="email"
                maxLength={256}
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
              />
            </div>
          </DoubleInputsRow>

          <DoubleInputsRow>
            <div style={{ marginRight: "64px" }}>
              <Label>Phone</Label>
              <TextInput
                type="text"
                maxLength={256}
                name="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(+55) 555 555 555"
                required
              />
            </div>

            <div>
              <Label>Budget</Label>
              <TextInput
                type="text"
                maxLength={256}
                name="budget"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                placeholder="Budget"
                required
              />
            </div>
          </DoubleInputsRow>

          <Label>Service</Label>
          <SingleSelect
            name="service"
            value={service}
            onChange={e => setService(e.target.value)}
            required
          >
            <option value="DEFAULT" hidden>
              Pick what service you need
            </option>

            <option value="web_development">web development</option>
            <option value="mobile_app_development">
              mobile app development
            </option>
            <option value="product_design">product design</option>
            <option value="blockchain">blockchain</option>
            <option value="custom_software_development">
              custom software development
            </option>
            <option value="agile_workshops">agile workshops</option>
          </SingleSelect>

          <Label>Idea / Project</Label>
          <IdeaTextArea
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={5000}
            placeholder="Describe your project"
            required
          />

          <Label>How did you find out about us?</Label>
          <SingleSelect
            name="source"
            value={source}
            onChange={e => setSource(e.target.value)}
            required
            style={{ width: "50%" }}
          >
            <option value="DEFAULT" hidden>
              Select how did you find about us
            </option>

            <option value="social_media">
              Social media (LinkedIn, Facebook, Instagram)
            </option>
            <option value="other">other</option>
          </SingleSelect>

          <PrivacyPolicyCheckboxContainer>
            <PrivacyPolicyCheckbox
              type="checkbox"
              name="accept-policy"
              value="yes"
              required
              onChange={e => setCheckedRules(e.currentTarget.checked)}
              checked={checkedRules}
            />
            &nbsp;I accept the&nbsp;
            <a
              href="/privacy-policy"
              target="_blank"
              className="has-text-black"
            >
              <b>
                <u>Privacy Policy</u>
              </b>
            </a>
          </PrivacyPolicyCheckboxContainer>

          <SubmitButton
            type="submit"
            disabled={!(checkedRules && name && email && message)}
          >
            submit
          </SubmitButton>
        </Form>

        {success && (
          <SuccessMessage>
            Thank you! Your submission has been received!
          </SuccessMessage>
        )}
        {error && (
          <ErrorMessage>
            Oops! Something went wrong while submitting the form.
          </ErrorMessage>
        )}
      </Container>
    </ContainerWrapper>
  )
}

export default WhatWeDoForm
