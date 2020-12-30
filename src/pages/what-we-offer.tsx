import React from "react"
import styled from "styled-components"
import HelmetWrapper from "../components/subcomponents/HelmetWrapper"
import Ratings from "./shared/Ratings"
import Banners from "../components/whatWeDo/banners/Banners"
import Contact from "../components/whatWeDo/contact/Contact"
import HowWeWork from "../components/whatWeDo/howWeWork/HowWeWork"
import OurDevelopmentAreas from "../components/whatWeDo/ourDevelopmentAreas/OurDevelopmentAreas"
import { HideTablet } from './shared/TabletHide'
import { TechnologyTags } from './shared/TechnologyTags'
import { Carousel } from './shared/Carousel'
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

  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

const ParagraphTextWrapper = styled.div({
  fontSize: "16px",
  lineHeight: "28px",
  fontFamily: variables.textFont,

  textAlign: "left",
  maxWidth: "955px",

  color: variables.blackTextColor,

  padding: "10px",
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

      <HideTablet>
        <TechnologyTags />
        <Carousel />
        <Ratings />
      </HideTablet>

      <Contact />
    </Page>
  )
}

export default WhatWeOfferPage
