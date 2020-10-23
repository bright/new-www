import {graphql} from 'gatsby'
import React from 'react'

import {Page} from '../layout/Page'
import ClutchInfo from '../components/home/ClutchInfo'
import Cocoaheads from '../components/home/Cocoaheads'
import ContactForm from '../components/home/ContactForm'
import ImageSpacer from '../components/home/ImageSpacer'
import OurServices from '../components/home/OurServices'
import PopularBlogPosts from '../components/home/PopularBlogPosts'
import ProductIdea from '../components/home/ProductIdea'
import SuccessStories from '../components/home/SuccessStories'
import HomeHeader from '../components/subcomponents/HomeHeader'
import Ratings from '../components/subcomponents/Ratings'

import '../styles/_page-index.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <Page className="page-index">
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
    </Page>
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
