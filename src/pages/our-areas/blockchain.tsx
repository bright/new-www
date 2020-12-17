import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrowBlack.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import Contact from "../../components/whatWeDo/contact/Contact"
import { Page } from "../../layout/Page"
import { Container, ContentWrapper, Paragraph, Title } from "./styles"

const Blockchain = () => {
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
            blockchain
          </Title>
          <Paragraph>
            Our team has a vast experience in blockchain projects, including the
            development of a solution for a global humanitarian organization.
            Blockchain technology is what we’re really good at!
          </Paragraph>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default Blockchain
