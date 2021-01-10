import React from "react"
import styled from "styled-components"
import { TextRegular } from "../../shared"

const Container = styled.div({
  marginTop: "74px",

  display: "flex",
  justifyContent: "center",
  width: "100%",
})

export const ContentWrapper = styled.div({
  maxWidth: "955px",

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
})

export const ParagraphTextWrapper = styled(TextRegular)({
  textAlign: "left",

  padding: "0 18px",
  marginTop: "30px",
})

const HowWeWorkDescriptionMobile2 = () => {
  return (
    <Container>
      <ContentWrapper>
        <ParagraphTextWrapper>
          Nothing feels equally rewarding as seeing the projects we work with
          our clients on grow into highly successful ventures. We firmly believe
          that we can contribute to the business success of a project by
          offering our expertise during all its development phases.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          At Bright Inventions, we put communication and transparency at the
          core and aim at being much more than just external consultants
          entrusted with a job. We also leverage our strategic location in the
          heart of Europe to combine remote, daily work with on-site
          collaboration with partners whenever need be.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          As our projects come to an end, we happily give our clients a helping
          hand in growing their internal software development teams to take over
          product development long-term. We’re there for you at all project
          development stages – after all, that’s what business partners are for!
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          Here’s a step-by-step breakdown of our process: Ideation: We’ll help
          you evaluate if your idea stands a chance in the market. You can count
          not only on an in-depth analysis of the industry you want to enter,
          but also on our candidness. Namely, if we find that your app idea has
          a low probability of succeeding, we’ll tell you straight away.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper style={{ marginTop: "0px" }}>
          Don’t be discouraged, though! We want your project to be a success, so
          we’ll happily help you work out an alternative that responds to a
          genuine market need.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          Requirements’ elicitation: At this stage, we organize workshops to dig
          deep into your project’s needs and requirements. Depending on the
          project, this can, for instance, take on the form of brainstorming or
          so-called “scoping sessions”. All so we can fully understand what
          needs to be done to bring the best possible version of your product to
          the market.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          Product design: Once we know exactly what your app will bring to the
          table as far as feature requirements are concerned, our Product Design
          team will make sure that it also offers a robust user experience. If
          you’re already working with in-house designers or a different design
          team, we’ll be more than happy to join forces in the UI/UX discipline.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          Software Development: as a world-class development team, Bright
          Invention represents the highest possible software development
          standards. Our development and design teams put a strong emphasis on
          innovation and optimization. This means that we don’t have a hard time
          bidding farewell to obsolete technology and constantly try out new
          solutions.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          Quality Assurance: Our QA team makes sure that your software is always
          up-and-running and offers the best possible performance. All this so
          you can rest assured that your project is in safe hands and nothing
          won’t disrupt its sound functioning.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          Support & Maintenance: After the initial launch of the product on the
          market, many of our customers entrust us with support, maintenance,
          and further development of the software. Depending on your needs,
          we’ll take care of ongoing support, UV+X maintenance, post-launch
          development, and many more.
        </ParagraphTextWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default HowWeWorkDescriptionMobile2
