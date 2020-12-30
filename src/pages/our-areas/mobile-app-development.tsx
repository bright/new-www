import { Link } from "gatsby"
import React from "react"
import BackArrow from "../../assets/backArrow.svg"
import HelmetWrapper from "../../components/subcomponents/HelmetWrapper"
import Contact from "../../components/whatWeDo/contact/Contact"
import { Page } from "../../layout/Page"
import { routeLinks } from "../../config/routing"
import {
  Container,
  ContentWrapper,
  DescriptionWrapper,
  Paragraph,
  SubTitle,
  Title,
} from "../../components/whatWeDo/ourDevelopmentAreas/styles"

const MobileAppDevelopment = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Mobile Development Services"
        description="About our mobile development services"
      />

      <Container>
        <ContentWrapper>
          <DescriptionWrapper>
            <Title>
              <Link to={routeLinks.whatWeOffer}>
                <BackArrow style={{ marginRight: "30px" }} />
              </Link>
              mobile app development
            </Title>
            <Paragraph>
              At Bright Inventions, we live and breathe native mobile app
              development for iOS and Android. Our app development team has
              broad experience in building applications in Swift, Java, and
              Kotlin.
            </Paragraph>
            <Paragraph>
              Not sure which technology to build your app in? No need to worry,
              as we’ll happily help you evaluate your project against the market
              and choose the most suitable solution. All so you can achieve the
              best app performance and a robust user experience on all mobile
              devices!
            </Paragraph>

            <SubTitle>iOS app development</SubTitle>
            <Paragraph>
              If you want to create a native iOS app for Apple users, then
              you’re in great hands. Throughout the years, we’ve worked on iOS
              projects of all levels of complexity – from simple projects for
              startups and mid-sized companies to complex apps for
              well-established, global brands.
            </Paragraph>
            <Paragraph>
              Regardless of whether you’re looking to develop your app from
              scratch, or searching for a team to take over an existing app’s
              maintenance and further development – reach out. We might just be
              the perfect match!
            </Paragraph>

            <SubTitle>Android app development</SubTitle>
            <Paragraph>
              Our mobile app developers will help you build an impressive
              presence among Android device users. We’ve worked on building
              native apps at all stages of development – from ideation and app
              design to launching and maintaining your app on Google Play Store.
            </Paragraph>
            <Paragraph>
              You can count on our expert Android developers to help choose the
              very best technology stack for your project. Reach out to learn
              more!
            </Paragraph>
          </DescriptionWrapper>

          <Contact />
        </ContentWrapper>
      </Container>
    </Page>
  )
}

export default MobileAppDevelopment
