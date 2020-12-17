import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrowBlack.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import Contact from "../../components/whatWeDo/contact/Contact"
import { Page } from "../../layout/Page"
import { Container, ContentWrapper, Paragraph, Title } from "./styles"

const AgileWorkshops = () => {
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
            agile workshops
          </Title>
          <Paragraph>
            Our customers come from all sorts of industries and disciplines,
            both technical and non-technical. However, regardless of their
            background …
          </Paragraph>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default AgileWorkshops
