import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrow.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import Contact from "../../components/whatWeDo/contact/Contact"
import { Page } from "../../layout/Page"
import { Container, ContentWrapper, Paragraph, Title } from "./styles"

const CustomSoftwareDevelopment = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Web Development Services"
        description="About our software development services"
      />

      <Container>
        <ContentWrapper>
          <Title>
            {/* TODO Replace arrow image when I got one from Alisa */}
            <Link to="/what-we-offer">
              <BackArrow style={{ marginRight: "30px" }} />
            </Link>
            custom software development
          </Title>
          <Paragraph>
            Custom software development is where our development team truly
            shines! We recognize that all businesses are unique and that many …
          </Paragraph>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default CustomSoftwareDevelopment
