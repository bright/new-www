import React from "react"
import styled from "styled-components"

import AboutUsPage from "../about-us"
import TeamMembers from "../../components/subcomponents/TeamMembers"
import { FormComponent } from "../../components/about-us/form-section/form"
import {TextRegular} from '../../components/shared'

const Caption = styled.div`
  &&& {
    max-width: 960px;
    margin: auto auto 105px;
    font-size: 1.375rem;
    line-height: 40px;
  }
`
export default function TeamPage() {
  return (
    <AboutUsPage>
      <div className="tab-content content">
        <Caption className="container">
          <TextRegular>
            We are a team of skilled and talented specialists: mobile, web and
            backend developers, UI and UX designers, product managers and
            marketers, who understand what makes bright digital products that
            build engagement and loyalty.
          </TextRegular>
        </Caption>
        {/* {% include _team_members.html %} */}
        <TeamMembers />
        <FormComponent />
      </div>
    </AboutUsPage>
  )
}
