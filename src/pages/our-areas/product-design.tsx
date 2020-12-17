import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrowBlack.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import Contact from "../../components/whatWeDo/contact/Contact"
import { Page } from "../../layout/Page"
import { Container, ContentWrapper, Paragraph, Title } from "./styles"

const ProductDesign = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Product Design Services"
        description="About our software development services"
      />

      <Container>
        <ContentWrapper>
          <Title>
            {/* TODO Replace arrow image when I got one from Alisa */}
            <Link to="/what-we-offer">
              <BackArrow style={{ marginRight: "30px" }} />
            </Link>
            product design
          </Title>
          <Paragraph>
            You can count on our expertise in interface analysis, animation
            design, UX and UI design, root cause analysis, and more. We have
            worked on design projects of all sizes.
          </Paragraph>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default ProductDesign
