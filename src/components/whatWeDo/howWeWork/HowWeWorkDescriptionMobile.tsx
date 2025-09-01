import React from "react"
import styled from "styled-components"
import { TextRegular } from "../../shared"

const Container = styled.div({
  marginTop: "74px",

  display: "flex",
  justifyContent: "center",
  width: "100%",
})

export const ContentWrapper = styled.div({
  maxWidth: "955px",

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
})

export const ParagraphTextWrapper = styled(TextRegular)({
  textAlign: "left",

  marginTop: "0px",
  padding: "0 18px",
})

const HowWeWorkDescriptionMobile = () => {
  return (
    <Container>
      <ContentWrapper>
        <ParagraphTextWrapper>
          From concept to launch, we help organizations of all shapes and sizes build impactful digital products. Our
          clients – ranging from startups and consultancies to renowned NGOs and global organizations – operate in
          FinTech, Blockchain, HealthTech, Retail, Logistics, and more.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          We help shape our clients’ success stories at all software development
          stages – from ideation and requirements’ elicitation, through product
          design and bespoke software development, to quality assurance and
          maintenance.
        </ParagraphTextWrapper>

        <ParagraphTextWrapper style={{ marginTop: "30px" }}>
          Regardless of the project development stage you’re in, we’re here to
          help bring your ideas to life.
        </ParagraphTextWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default HowWeWorkDescriptionMobile
