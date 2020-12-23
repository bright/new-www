import React from "react"
import styled from "styled-components"
import WhatWeDoArrows from "../../../assets/whatWeDoArrows.svg"
import ProjectDevelopment from "../../../assets/projectDevelopment.svg"
import SoftwareDevelopment from "../../../assets/softwareDevelopment.svg"
import RequirementsElicitation from "../../../assets/requirmentsElicitation.svg"
import ProductDesign from "../../../assets/productDesignWithArrow.svg"
import QualityAssurance from "../../../assets/qualityAssurance.svg"
import Ideation from "../../../assets/ideation.svg"
import Maintenance from "../../../assets/maintenance.svg"
import variables from "../../../styles/variables"

const Container = styled.div({
  marginTop: "25px",
  marginBottom: "186px",

  display: "flex",
  justifyContent: "center",
  width: "100%",

  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

const ContentWrapper = styled.div({
  maxWidth: "1240px",

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  padding: "0px 20px",

  // TODO
  // backgroundImage: "url(/images/whatWeDoArrows.svg)",
})

const SectionTitle = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "100%",
  marginTop: "50px",
})

const Title = styled.div({
  maxWidth: "955px",

  fontWeight: "bold",
  marginTop: "36px",

  fontSize: "22px",
  lineHeight: "27px",
  fontFamily: variables.headerFont,

  color: variables.blackTextColor,
})

const Description = styled.div({
  maxWidth: "955px",
  marginTop: "50px",

  color: variables.blackTextColor,
  textAlign: "left",
  fontSize: "16px",
  lineHeight: "28px",
  fontFamily: variables.textFont,
})

const HowWeWorkSteps = () => {
  return (
    <Container>
      <ContentWrapper>
        <SectionTitle>
          <Ideation />
          <Title>Ideation</Title>
        </SectionTitle>
        <Description>
          We’ll help you evaluate if your idea stands a chance in the market.
          You can count not only on an in-depth analysis of the industry you
          want to enter, but also on our candidness. Namely, if we find that
          your app idea has a low probability of succeeding, we’ll tell you
          straight away. Don’t be discouraged, though! We want your project to
          be a success, so we’ll happily help you work out an alternative that
          responds to a genuine market need.
        </Description>

        <SectionTitle>
          <RequirementsElicitation />
          <Title>Requirements elicitation</Title>
        </SectionTitle>
        <Description>
          At this stage, we organize workshops to dig deep into your project’s
          needs and requirements. Depending on the project, this can, for
          instance, take on the form of brainstorming or so-called “scoping
          sessions”. All so we can fully understand what needs to be done to
          bring the best possible version of your product to the market.
        </Description>

        <SectionTitle>
          <ProjectDevelopment />
          <Title>Project development</Title>
        </SectionTitle>
        <Description>
          We’ll be more than delighted to organize Agile workshops for you and
          your team. This way, we’ll help you quickly get a grasp of what this
          leading project management methodology brings to the table! It will
          also help you understand how we plan and prioritize our work in order
          to bring your product to the market.
        </Description>

        <SectionTitle>
          <ProductDesign />
          <Title>Product design</Title>
        </SectionTitle>
        <Description>
          Once we know exactly what your app will bring to the table as far as
          feature requirements are concerned, our Product Design team will make
          sure that it also offers a robust user experience. If you’re already
          working with in-house designers or a different design team, we’ll be
          more than happy to join forces in the UI/UX discipline.
        </Description>

        <SectionTitle>
          <SoftwareDevelopment />
          <Title>Software development</Title>
        </SectionTitle>
        <Description>
          As a world-class development team, Bright Invention represents the
          highest possible software development standards. Our development and
          design teams put a strong emphasis on innovation and optimization.
          This means that we don’t have a hard time bidding farewell to obsolete
          technology and constantly try out new solutions.
        </Description>

        <SectionTitle>
          <QualityAssurance />
          <Title>Quality assurance</Title>
        </SectionTitle>
        <Description>
          Our QA team makes sure that your software is always up-and-running and
          offers the best possible performance. All this so you can rest assured
          that your project is in safe hands and nothing won’t disrupt its sound
          functioning.
        </Description>

        <SectionTitle>
          <Maintenance />
          <Title>Maintenance</Title>
        </SectionTitle>
        <Description>
          After the initial launch of the product on the market, many of our
          customers entrust us with support, maintenance, and further
          development of the software. Depending on your needs, we’ll take care
          of ongoing support, UV+X maintenance, post-launch development, and
          many more.
        </Description>
      </ContentWrapper>
    </Container>
  )
}

export default HowWeWorkSteps
