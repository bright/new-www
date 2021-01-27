import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrow.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import {Contact} from "../../components/shared/Contact"
import { Page } from "../../layout/Page"
import { routeLinks } from "../../config/routing"
import {
  Container,
  ContentWrapper,
  Paragraph,
  Title,
  DescriptionWrapper,
} from "../../components/whatWeDo/ourDevelopmentAreas/subpagesStyles"

const ProductDesign = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Product Design Services"
        description="About our software development services"
      />

      <Container>
        <ContentWrapper>
          <DescriptionWrapper>
            <Title>
              <Link to={routeLinks.whatWeOffer}>
                <BackArrow style={{ marginRight: "30px" }} />
              </Link>
              product design
            </Title>
            <Paragraph>
              We know what it takes to create not only functional but also
              beautifully crafted online products that are memorable to your
              audience. You can count on our expertise in interface analysis,
              animation design, UX and UI design, as well as root cause
              analysis, among many others.
            </Paragraph>
            <Paragraph>
              We have worked on design projects of all sizes – from simple
              mobile apps to scalable enterprise software systems. We’ll happily
              discuss how we can turn your idea or design brief into a polished
              final product, optimized for all devices and platforms.
            </Paragraph>
          </DescriptionWrapper>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default ProductDesign
