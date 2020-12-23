import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrow.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import Contact from "../../components/whatWeDo/contact/Contact"
import { Page } from "../../layout/Page"
import {
  Container,
  ContentWrapper,
  DescriptionWrapper,
  Paragraph,
  Title,
} from "../../components/whatWeDo/ourDevelopmentAreas/styles"

const WebDevelopment = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Web Development Services"
        description="About our software development services"
      />

      <Container>
        <ContentWrapper>
          <DescriptionWrapper>
            <Title>
              <Link to="/what-we-offer">
                <BackArrow style={{ marginRight: "30px" }} />
              </Link>
              web development
            </Title>
            <Paragraph>
              We provide a wide range of custom full stack web development
              services for small, medium, and large businesses. We’ve got years
              of experience at developing web apps, web services, and websites
              that are tailor-made to fit our clients’ requirements and goals.
            </Paragraph>

            <Paragraph>
              We rely on Agile methodology and work with a rich technology stack
              – JavaScript, CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL and
              many more.
            </Paragraph>

            <Paragraph>
              Regardless of whether you want to create a simple web app or a
              complex, interactive web platform – you’ve found the right
              software development team!
            </Paragraph>
          </DescriptionWrapper>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default WebDevelopment
