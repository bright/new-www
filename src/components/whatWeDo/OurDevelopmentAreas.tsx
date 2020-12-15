import React from "react"
import styled from "styled-components"
import Blockchain from "../../assets/blockchain.svg"
import MobileAppDevelopment from "../../assets/mobileAppDevelopment.svg"
import ProductDesign from "../../assets/productDesign.svg"
import RightArrow from "../../assets/rightArrow.svg"
import WebDevelopment from "../../assets/webDevelopment.svg"
import AgileWorkshops from "../../assets/agileWorkshops.svg"
import CustomSoftwareDevelopment from "../../assets/customSoftwareDevelopment.svg"
import variables from "../../styles/variables"

const DevelopmentAreasWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
})

const DevelopmentAreasContainer = styled.div({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
  flexWrap: "wrap",
  maxWidth: "1344px",
})

const SectionTitle = styled.div<{
  iconMobileWidth: string
  iconMobileHeight: string
}>(({ iconMobileWidth, iconMobileHeight }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",

  ["@media screen and (max-width: 768px)"]: {
    svg: {
      width: iconMobileWidth,
      height: iconMobileHeight,
    },
  },
}))

const Title = styled.div({
  fontWeight: "bold",
  marginTop: "36px",

  fontSize: "22px",
  lineHeight: "27px",
  fontFamily: variables.headerFont,

  ["@media screen and (max-width: 768px)"]: {
    fontSize: "18px",
    lineHeight: "22px",
    marginTop: "30px",
  },
})

const SectionText = styled.div({
  marginTop: "60px",

  textAlign: "left",

  fontSize: "22px",
  lineHeight: "40px",
  fontFamily: variables.textFont,

  color: variables.blackTextColor,

  ["@media screen and (max-width: 768px)"]: {
    fontSize: "16px",
    lineHeight: "28px",
    marginTop: "30px",
    textAlign: "center",
  },
})

const DevelopmentAreaContainer = styled.div({
  flexBasis: "100%",
  flexGrow: 0,
  flexShrink: 1,

  marginTop: "65px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: "10px",

  ["@media screen and (min-width: 768px)"]: {
    flexBasis: "50%",
  },
})

const GoToContainer = styled.div({
  marginTop: "18px",

  ["@media screen and (max-width: 768px)"]: {
    display: "none",
  },
})

const OurDevelopmentAreas = () => {
  return (
    <DevelopmentAreasWrapper>
      <DevelopmentAreasContainer>
        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="71px" iconMobileHeight="67px">
            <WebDevelopment />
            <Title>web development</Title>
          </SectionTitle>
          <SectionText>
            We provide a wide range of custom full stack web development
            services. We rely on a rich technology stack, including JavaScript,
            CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL, and more.
          </SectionText>
          <GoToContainer>
            <RightArrow />
          </GoToContainer>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="74px" iconMobileHeight="63px">
            <MobileAppDevelopment />
            <Title>mobile app development</Title>
          </SectionTitle>
          <SectionText>
            We offer native mobile app development for iOS and Android. Our app
            development team has broad experience in building applications in
            Swift, Java, and Kotlin.
          </SectionText>
          <GoToContainer>
            <RightArrow />
          </GoToContainer>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="63px" iconMobileHeight="64px">
            <ProductDesign />
            <Title>product design</Title>
          </SectionTitle>
          <SectionText>
            You can count on our expertise in interface analysis, animation
            design, UX and UI design, root cause analysis, and more. We have
            worked on design projects of all sizes.
          </SectionText>
          <GoToContainer>
            <RightArrow />
          </GoToContainer>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="76px" iconMobileHeight="78px">
            <Blockchain />
            <Title>blockchain</Title>
          </SectionTitle>
          <SectionText>
            Our team has a vast experience in blockchain projects, including the
            development of a solution for a global humanitarian organization.
            Blockchain technology is what we’re really good at!
          </SectionText>
          <GoToContainer>
            <RightArrow />
          </GoToContainer>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="52px" iconMobileHeight="65px">
            <CustomSoftwareDevelopment />
            <Title>custom software development</Title>
          </SectionTitle>
          <SectionText>
            Custom software development is where our development team truly
            shines! We recognize that all businesses are unique and that many …
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
            Our customers come from all sorts of industries and disciplines,
            both technical and non-technical. However, regardless of their
            backgroun …
          </SectionText>
          <GoToContainer>
            <RightArrow />
          </GoToContainer>
        </DevelopmentAreaContainer>
      </DevelopmentAreasContainer>
    </DevelopmentAreasWrapper>
  )
}

export default OurDevelopmentAreas
