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
import { Link } from "gatsby"

const DevelopmentAreasWrapper = styled.div({
  display: "flex",
  justifyContent: "center",

  width: "100%",
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
  alignItems: "center",

  ["@media screen and (max-width: 767px)"]: {
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

  ["@media screen and (max-width: 767px)"]: {
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

  ["@media screen and (max-width: 767px)"]: {
    fontSize: "16px",
    lineHeight: "28px",
    marginTop: "30px",
    textAlign: "center",
  },
})

const DevelopmentAreaContainer = styled.div({
  flexGrow: 0,
  flexShrink: 1,

  marginTop: "65px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: "10px",

  ["@media screen and (min-width: 767px)"]: {
    flexBasis: "50%",
  },
})

const GoToContainer = styled.div({
  marginTop: "18px",
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
          <Link to="/our-areas/web-development">
            <SectionText>
              We provide a wide range of custom full stack web development
              services. We rely on a rich technology stack, including
              JavaScript, CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL, and
              more.
            </SectionText>
          </Link>
          <Link to="/our-areas/web-development">
            <GoToContainer>
              <RightArrow />
            </GoToContainer>
          </Link>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="74px" iconMobileHeight="63px">
            <MobileAppDevelopment />
            <Title>mobile app development</Title>
          </SectionTitle>
          <Link to="/our-areas/mobile-app-development">
            <SectionText>
              We offer native mobile app development for iOS and Android. Our
              app development team has broad experience in building applications
              in Swift, Java, and Kotlin.
            </SectionText>
          </Link>
          <Link to="/our-areas/mobile-app-development">
            <GoToContainer>
              <RightArrow />
            </GoToContainer>
          </Link>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="63px" iconMobileHeight="64px">
            <ProductDesign />
            <Title>product design</Title>
          </SectionTitle>
          <Link to="/our-areas/product-design">
            <SectionText>
              You can count on our expertise in interface analysis, animation
              design, UX and UI design, root cause analysis, and more. We have
              worked on design projects of all sizes.
            </SectionText>
          </Link>
          <Link to="/our-areas/product-design">
            <GoToContainer>
              <RightArrow />
            </GoToContainer>
          </Link>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="76px" iconMobileHeight="78px">
            <Blockchain />
            <Title>blockchain</Title>
          </SectionTitle>
          <Link to="/our-areas/blockchain">
            <SectionText>
              Our team has a vast experience in blockchain projects, including
              the development of a solution for a global humanitarian
              organization. Blockchain technology is what we’re really good at!
            </SectionText>
          </Link>
          <Link to="/our-areas/blockchain">
            <GoToContainer>
              <RightArrow />
            </GoToContainer>
          </Link>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="52px" iconMobileHeight="65px">
            <CustomSoftwareDevelopment />
            <Title>custom software development</Title>
          </SectionTitle>
          <Link to="/our-areas/custom-software-development">
            <SectionText>
              Custom software development is where our development team truly
              shines! We recognize that all businesses are unique and that many
              …
            </SectionText>
          </Link>
          <Link to="/our-areas/custom-software-development">
            <GoToContainer>
              <RightArrow />
            </GoToContainer>
          </Link>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitle iconMobileWidth="52px" iconMobileHeight="65px">
            <AgileWorkshops />
            <Title>agile workshops</Title>
          </SectionTitle>
          <Link to="/our-areas/agile-workshops">
            <SectionText>
              Our customers come from all sorts of industries and disciplines,
              both technical and non-technical. However, regardless of their
              backgroun …
            </SectionText>
          </Link>
          <Link to="/our-areas/agile-workshops">
            <GoToContainer>
              <RightArrow />
            </GoToContainer>
          </Link>
        </DevelopmentAreaContainer>
      </DevelopmentAreasContainer>
    </DevelopmentAreasWrapper>
  )
}

export default OurDevelopmentAreas
