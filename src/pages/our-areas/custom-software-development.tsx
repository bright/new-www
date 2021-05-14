import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrow.svg"
import {Contact} from "../../components/shared/Contact"
import { Page } from "../../layout/Page"
import { routeLinks } from "../../config/routing"
import {
  Container,
  ContentWrapper,
  DescriptionWrapper,
  Paragraph,
  Title,
} from "../../components/whatWeDo/ourDevelopmentAreas/subpagesStyles"
import { HelmetTitleDescription } from '../../meta/HelmetTitleDescription'

const CustomSoftwareDevelopment = () => {
  return (
    <Page>
      <HelmetTitleDescription
        title="Web Development Services"
        description="About our software development services"
      />

      <Container>
        <ContentWrapper>
          <DescriptionWrapper>
            <Title>
              <Link to={routeLinks.whatWeOffer}>
                <BackArrow style={{ marginRight: "30px" }} />
              </Link>
              custom software development
            </Title>
            <Paragraph>
              Custom software development is where our development team truly
              shines! We recognize that all businesses are unique and that many
              times only bespoke software development can truly address their
              needs, challenges, and goals. By adopting a personalized approach
              for your software development, we also simplify and optimize your
              workflows. We help our customers throughout all software delivery
              phases: from ideation and requirements’ elicitation, through
              product design and Agile project management, to software
              development, quality assurance, and maintenance.
            </Paragraph>
            <Paragraph>
              Sounds interesting? Don’t hesitate to reach out – we’d love to
              discuss how we can help with your software development needs!
            </Paragraph>
          </DescriptionWrapper>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default CustomSoftwareDevelopment
