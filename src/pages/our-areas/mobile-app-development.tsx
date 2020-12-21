import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrow.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import Contact from "../../components/whatWeDo/contact/Contact"
import { Page } from "../../layout/Page"
import { Container, ContentWrapper, Paragraph, Title } from "./styles"

const MobileAppDevelopment = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Mobile Development Services"
        description="About our mobile development services"
      />

      <Container>
        <ContentWrapper>
          <Title>
            {/* TODO Replace arrow image when I got one from Alisa */}
            <Link to="/what-we-offer">
              <BackArrow style={{ marginRight: "30px" }} />
            </Link>
            mobile app development
          </Title>
          <Paragraph>
            We offer native mobile app development for iOS and Android. Our app
            development team has broad experience in building applications in
            Swift, Java, and Kotlin.
          </Paragraph>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default MobileAppDevelopment
