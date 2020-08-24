import React, { FC } from "react"
import { ButtonInverted, Section, SectionTitle } from "../shared"

export interface CocoaheadsProps {}

const Cocoaheads: FC<CocoaheadsProps> = props => {
  return (
    <Section
      className="has-background-black has-text-centered"
      style={{ padding: "6em 0" }}
    >
      <SectionTitle className="is-size-3 has-text-white">
        we combine technical knowledge with deep agile experience
      </SectionTitle>
      <ButtonInverted>workshops</ButtonInverted>
    </Section>
  )
}

export default Cocoaheads
