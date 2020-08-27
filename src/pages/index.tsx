import { graphql } from "gatsby"
import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ClutchInfo from "../components/home/ClutchInfo"
import Cocoaheads from "../components/home/Cocoaheads"
import ContactForm from "../components/home/ContactForm"
import ImageSpacer from "../components/home/ImageSpacer"
import OurServices from "../components/home/OurServices"
import PopularBlogPosts from "../components/home/PopularBlogPosts"
import ProductIdea from "../components/home/ProductIdea"
import SuccessStories from "../components/home/SuccessStories"
import Layout from "../components/layout"
import HomeHeader from "../components/subcomponents/HomeHeader"
import { SocialIconsSpaced } from "../components/subcomponents/SocialIconsSpaced"
import "../styles/_page-index.scss"
import Ratings from "../components/subcomponents/Ratings"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <Layout className="page-index">
      <HomeHeader />
      {/* <SocialIconsSpaced /> */}
      <OurServices />
      <ImageSpacer />
      <SuccessStories />
      <Ratings />
      <ClutchInfo />
      <ProductIdea />
      <PopularBlogPosts />
      <Cocoaheads />
      <ContactForm />
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "project" }, published: { ne: false } }
      }
      limit: 6
    ) {
      edges {
        node {
          frontmatter {
            title
            image
            layout
            slug
            published
          }
        }
      }
    }
  }
`

export default IndexPage
