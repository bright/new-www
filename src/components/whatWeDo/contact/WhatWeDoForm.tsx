import React, { FC, useState } from "react"
import styled from "styled-components"
import { FormType, sendMail } from "../../../helpers/mail"
import { Button, Section, SectionTitle } from "../../shared"

const ContainerWrapper = styled.div({
  display: "flex",
  justifyContent: "center",

  marginTop: "185px",

  ["@media screen and (max-width: 768px)"]: {
    display: "none",
  },
})

const Container = styled.div({
  maxWidth: "955px",

  display: "flex",
  flexDirection: "column",

  color: "#131214",
})

const Header = styled.div({
  font: "normal normal 800 40px/49px Montserrat",
  color: "#000000",
})

const Description = styled.div({
  font: "normal normal normal 22px/40px Lato",

  marginTop: "55px",
})

const Form = styled.form({
  marginTop: "55px",
})

const SpacedButton = styled(Button)``

const InputLabel = styled.div({
  font: "normal normal normal 16px/40px Lato",
})

const TextInput = styled.input({
  height: "64px",
  width: "445px",
  font: "normal normal 600 16px/40px Lato",
  color: "#131214",
  padding: "20px",
  border: "1px solid #131214",
})

const SingleSelect = styled.select({
  height: "64px",
  width: "100%",
  font: "normal normal 600 16px/40px Lato",
  color: "#131214",
  padding: "20px",
  border: "1px solid #131214",
})

const DoubleInputsRow = styled.div({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,

  flexWrap: "wrap",
  marginBottom: "64px",
})

const WhatWeDoForm = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const [phone, setPhone] = useState<string>("")
  const [budget, setBudget] = useState<string>("")

  const [service, setService] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [source, setSource] = useState<string>("")
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
        email: wrapValue(email),
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
              <InputLabel>Name / Company</InputLabel>
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
              <InputLabel>Email</InputLabel>
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
              <InputLabel>Phone</InputLabel>
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
              <InputLabel>Budget</InputLabel>
              <TextInput
                type="text"
                maxLength={256}
                name="budget"
                value={email}
                onChange={e => setBudget(e.target.value)}
                placeholder="Budget"
                required
              />
            </div>
          </DoubleInputsRow>

          <InputLabel>Service</InputLabel>
          <SingleSelect
            name="service"
            value={service}
            onChange={e => setService(e.target.value)}
            required
          >
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

          <div className="field">
            <div className="control">
              <textarea
                name="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={5000}
                placeholder="Message"
                required
                className="textarea"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
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
              </label>
            </div>
          </div>
          <div className="field">
            <div className="control has-text-centered">
              <SpacedButton
                type="submit"
                disabled={!(checkedRules && name && email && message)}
              >
                submit
              </SpacedButton>
            </div>
          </div>
        </Form>
        {success && (
          <div className="is-size-6">
            Thank you! Your submission has been received!
          </div>
        )}
        {error && (
          <div className="is-size-6">
            Oops! Something went wrong while submitting the form.
          </div>
        )}
      </Container>
    </ContainerWrapper>
  )
}

export default WhatWeDoForm
