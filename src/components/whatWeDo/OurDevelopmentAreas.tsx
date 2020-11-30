import React from "react"
import styled from "styled-components"
import Blockchain from "../../assets/blockchain.svg"
import MobileAppDevelopment from "../../assets/mobileAppDevelopment.svg"
import ProductDesign from "../../assets/productDesign.svg"
import RightArrow from "../../assets/rightArrow.svg"
import WebDevelopment from "../../assets/webDevelopment.svg"
import AgileWorkshops from "../../assets/agileWorkshops.svg"
import CustomSoftwareDevelopment from "../../assets/customSoftwareDevelopment.svg"

const DevelopmentAreasContainer = styled.div({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
  flexWrap: "wrap",
})

const SectionTitle = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
})

const Title = styled.div({
  fontWeight: "bold",
  marginTop: "36px",
})

const SectionText = styled.div({
  marginTop: "60px",

  textAlign: "left",
  font: "normal normal normal 22px/40px Lato",
  letterSpacing: "0px",
  color: "#000000",
  opacity: 0.75,
})

const DevelopmentAreaContainer = styled.div({
  flexBasis: "100%",
  flexGrow: 0,
  flexShrink: 1,

  marginTop: "75px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  ["@media screen and (min-width: 768px)"]: {
    flexBasis: "35%",
  },
})

const GoToContainer = styled.div({
  marginTop: "18px",
})

const OurDevelopmentAreas = () => {
  return (
    <DevelopmentAreasContainer>
      <DevelopmentAreaContainer>
        <SectionTitle>
          <WebDevelopment />
          <Title>web development</Title>
        </SectionTitle>
        <SectionText>
          In our projects we rely on a rich technology stack including
          JavaScript, CSS. HTML, Java, Node.js, AWS, MySQL, PostgreSQL and
          something else
        </SectionText>
        <GoToContainer>
          <RightArrow />
        </GoToContainer>
      </DevelopmentAreaContainer>

      <DevelopmentAreaContainer>
        <SectionTitle>
          <MobileAppDevelopment />
          <Title>mobile app development</Title>
        </SectionTitle>
        <SectionText>
          Our app development team with a perfect command of Swift as well as
          Java and Kotlin offers native mobile development for iOS and something
          else
        </SectionText>
        <GoToContainer>
          <RightArrow />
        </GoToContainer>
      </DevelopmentAreaContainer>

      <DevelopmentAreaContainer>
        <SectionTitle>
          <ProductDesign />
          <Title>product design</Title>
        </SectionTitle>
        <SectionText>
          Our design team can help your idea come into being with the most
          impactful practices and tech tools. Something and someand something
          else
        </SectionText>
        <GoToContainer>
          <RightArrow />
        </GoToContainer>
      </DevelopmentAreaContainer>

      <DevelopmentAreaContainer>
        <SectionTitle>
          <Blockchain />
          <Title>blockchain</Title>
        </SectionTitle>
        <SectionText>
          In many our projects we use blockchain technology, which ensures the
          best safety practices lorem ipsum dolor sit amet lorem ipsand
          something else
        </SectionText>
        <GoToContainer>
          <RightArrow />
        </GoToContainer>
      </DevelopmentAreaContainer>

      <DevelopmentAreaContainer>
        <SectionTitle>
          <CustomSoftwareDevelopment />
          <Title>custom software development</Title>
        </SectionTitle>
        <SectionText>
          In many our projects we use blockchain technology, which ensures the
          best safety practices lorem ipsum dolor sit amet lorem ipsand
          something else
        </SectionText>
        <GoToContainer>
          <RightArrow />
        </GoToContainer>
      </DevelopmentAreaContainer>

      <DevelopmentAreaContainer>
        <SectionTitle>
          <AgileWorkshops />
          <Title>agile workshops</Title>
        </SectionTitle>
        <SectionText>
          In many our projects we use blockchain technology, which ensures the
          best safety practices lorem ipsum dolor sit amet lorem ipsand
          something else
        </SectionText>
        <GoToContainer>
          <RightArrow />
        </GoToContainer>
      </DevelopmentAreaContainer>
    </DevelopmentAreasContainer>
  )
}

export default OurDevelopmentAreas
