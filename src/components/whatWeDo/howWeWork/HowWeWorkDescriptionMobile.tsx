import React from "react"
import styled from "styled-components"

const Container = styled.div({
  color: "#131214",

  marginTop: "74px",

  display: "flex",
  justifyContent: "center",
  width: "100%",

  ["@media screen and (min-width: 768px)"]: {
    display: "none",
  },
})

export const ContentWrapper = styled.div({
  maxWidth: "955px",

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
})

export const ParagraphTextWrapper = styled.div({
  fontFamily: "Lato",
  textAlign: "left",

  letterSpacing: "0px",
  color: "#131214",

  marginTop: "0px",
  fontSize: "16px",
  lineHeight: "28px",
  padding: "0 18px",
})

const HowWeWorkDescriptionMobile = () => {
  return (
    <Container>
      <ContentWrapper>
        <ParagraphTextWrapper>
          We offer custom software development for organizations of all shapes
          and sizes – from emerging startups, mid-sized companies and
          consultancy agencies, to renowned NGOs and international
          organizations. Our clients come from multiple industries, including
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
