import React from "react"
import TeamMembers from "../../components/subcomponents/TeamMembers"
import AboutUsPage from "./index"
import styled from "styled-components"
import ContactForm from "../../components/home/ContactForm"
import { FormComponent } from "../../components/about-us/form-section/form"

const Caption = styled.p`
  &&& {
    margin: auto;
    max-width: 960px;
    margin-bottom: 105px;
    font-size: 1.375rem;
    line-height: 40px;
    font-family: Lato;
  }
`
export default function TeamPage() {
  return (
    <AboutUsPage>
      <div className="tab-content content">
        <Caption className="container">
          We are a team of skilled and talented specialists: mobile, web and
          backend developers, UI and UX designers, product managers and
          marketers, who understand what makes bright digital products that
          build engagement and loyalty.
        </Caption>
        {/* {% include _team_members.html %} */}
        <TeamMembers />
        <FormComponent />
      </div>
    </AboutUsPage>
  )
}
