import React from "react"
import styled from "styled-components"
import HelmetWrapper from "../components/subcomponents/HelmetWrapper"
import Ratings from "../components/subcomponents/Ratings"
import Banners from "../components/whatWeDo/banners/Banners"
import Contact from "../components/whatWeDo/contact/Contact"
import HowWeWork from "../components/whatWeDo/howWeWork/HowWeWork"
import OurDevelopmentAreas from "../components/whatWeDo/OurDevelopmentAreas"
import Showcase from "../components/whatWeDo/showcase/Showcase"
import { Page } from "../layout/Page"
import variables from "../styles/variables"

const ParagraphContainer = styled.div({
  display: "flex",
  justifyContent: "center",

  width: "100%",
  paddingTop: "30px",
  paddingBottom: "10px",
})

const TopParagraphContainer = styled(ParagraphContainer)({
  paddingTop: "64px",

  ["@media screen and (max-width: 768px)"]: {
    display: "none",
  },
})

const ParagraphTextWrapper = styled.div({
  fontSize: "22px",
  lineHeight: "40px",
  fontFamily: variables.textFont,

  textAlign: "left",
  maxWidth: "955px",

  color: variables.blackTextColor,
  opacity: 0.75,

  padding: "10px",
})

const RatingsContainer = styled.div({
  ["@media screen and (max-width: 768px)"]: {
    display: "none",
  },
})

const WhatWeOfferPage: React.FocusEventHandler = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Mobile and Web Development Services"
        description="About our software development services"
      />
      <TopParagraphContainer>
        <ParagraphTextWrapper>
          We offer custom software development for organizations of all shapes
          and sizes – from emerging startups, mid-sized companies and
          consultancy agencies, to renowned NGOs and international
          organizations. Our clients come from multiple industries, including
          FinTech, Blockchain, HealthTech, Retail, Logistics, and more.
        </ParagraphTextWrapper>
      </TopParagraphContainer>

      <OurDevelopmentAreas />
      <Banners />
      <HowWeWork />

      <Showcase />

      <RatingsContainer>
        <Ratings />
      </RatingsContainer>

      <Contact />
    </Page>
  )
}

export default WhatWeOfferPage
