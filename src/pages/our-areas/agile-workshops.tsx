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
} from "./styles"

const AgileWorkshops = () => {
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
              agile workshops
            </Title>
            <Paragraph>
              Our customers come from all sorts of industries and disciplines,
              both technical and non-technical. However, regardless of their
              background, it is our goal that they feel well informed throughout
              the entire cooperation – even if software development is something
              they’ve never done before. If that’s also the case for you, we’ll
              be more than delighted to organize Agile workshops for you and
              your team. This way, we’ll help you quickly get a grasp of what
              this leading project management methodology brings to the table!
              It will also help you understand how we plan and prioritize our
              work in order to bring your product to the market.
            </Paragraph>
          </DescriptionWrapper>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default AgileWorkshops
