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
  DescriptionWrapper,
  Paragraph,
  Title,
} from "../../components/whatWeDo/ourDevelopmentAreas/styles"

const Blockchain = () => {
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
              <Link to={routeLinks.whatWeOffer}>
                <BackArrow style={{ marginRight: "30px" }} />
              </Link>
              blockchain
            </Title>
            <Paragraph>
              Blockchain is an area we’re especially proud of being experts in –
              not only because it’s a groundbreaking technology, but also
              because of its global, humanitarian impact. We’re honored to have
              been entrusted with a major Blockchain for social impact project –
              a global food assistance program that helps wire cash to some of
              the most impoverished communities in the world.
            </Paragraph>
            <Paragraph>
              Do you have a blockchain technology project to discuss? Reach out
              and and we’ll happily schedule a call!
            </Paragraph>
          </DescriptionWrapper>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default Blockchain
