import { Link } from "gatsby"
import React from "react"
import AgileWorkshops from "../../../assets/agileWorkshops.svg"
import Blockchain from "../../../assets/blockchain.svg"
import CustomSoftwareDevelopment from "../../../assets/customSoftwareDevelopment.svg"
import MobileAppDevelopment from "../../../assets/mobileAppDevelopment.svg"
import ProductDesign from "../../../assets/productDesign.svg"
import RightArrow from "../../../assets/rightArrow.svg"
import WebDevelopment from "../../../assets/webDevelopment.svg"
import {
  DevelopmentAreasWrapper,
  DevelopmentAreasContainer,
  DevelopmentAreaContainer,
  SectionTitleContainer,
  ImageContainer,
  SectionText,
  GoToContainer,
  Title,
} from "./styles"

const OurDevelopmentAreas = () => {
  return (
    <DevelopmentAreasWrapper>
      <DevelopmentAreasContainer>
        <DevelopmentAreaContainer>
          <SectionTitleContainer iconMobileWidth="71px" iconMobileHeight="67px">
            <ImageContainer>
              <WebDevelopment />
            </ImageContainer>
            <Title>web development</Title>
          </SectionTitleContainer>
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
          <SectionTitleContainer iconMobileWidth="74px" iconMobileHeight="63px">
            <ImageContainer>
              <MobileAppDevelopment />
            </ImageContainer>
            <Title>mobile app development</Title>
          </SectionTitleContainer>
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
          <SectionTitleContainer iconMobileWidth="63px" iconMobileHeight="64px">
            <ImageContainer>
              <ProductDesign />
            </ImageContainer>
            <Title>product design</Title>
          </SectionTitleContainer>
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
          <SectionTitleContainer iconMobileWidth="76px" iconMobileHeight="78px">
            <ImageContainer>
              <Blockchain />
            </ImageContainer>
            <Title>blockchain</Title>
          </SectionTitleContainer>
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
          <SectionTitleContainer iconMobileWidth="52px" iconMobileHeight="65px">
            <ImageContainer>
              <CustomSoftwareDevelopment />
            </ImageContainer>
            <Title>custom software development</Title>
          </SectionTitleContainer>
          <Link to="/our-areas/custom-software-development">
            <SectionText>
              Our custom software serves the unique processes of your business,
              solves particular problems and makes your workflows more
              efficient. We help you throughout all of the software delivery
              phases.
            </SectionText>
          </Link>
          <Link to="/our-areas/custom-software-development">
            <GoToContainer>
              <RightArrow />
            </GoToContainer>
          </Link>
        </DevelopmentAreaContainer>

        <DevelopmentAreaContainer>
          <SectionTitleContainer iconMobileWidth="52px" iconMobileHeight="65px">
            <ImageContainer>
              <AgileWorkshops />
            </ImageContainer>
            <Title>agile workshops</Title>
          </SectionTitleContainer>
          <Link to="/our-areas/agile-workshops">
            <SectionText>
              We'll be more than delighted to organise Agile workshops for you
              and your team and help you quickly get a grasp of this leading
              project management methodology brings to the table.
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
