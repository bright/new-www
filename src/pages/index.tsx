import React from 'react'

import {Page} from '../layout/Page'
import {HideTablet} from '../components/shared'
import {Header} from '../components/home/Header'
import {Achievements} from '../components/home/Achievements'
import {Carousel} from '../components/shared/Carousel'
import {TechnologyTags} from '../components/shared/TechnologyTags'
import {OurServices} from '../components/shared/OurServices'
import {ImageSpacer} from '../components/shared/ImageSpacer'
// import {Projects} from './home/Projects'
import Ratings from '../components/shared/Ratings'

import ContactForm from '../components/home/ContactForm'
import PopularBlogPosts from '../components/home/PopularBlogPosts'
import SuccessStories from '../components/home/SuccessStories'

import '../styles/_page-index.scss'

export default () => {
  return (
    <Page className="page-index">
      <Header />
      <Achievements />
      <HideTablet>
          <Carousel />
          <TechnologyTags />
      </HideTablet>
      <OurServices />
      <ImageSpacer />
      <SuccessStories />
      <Ratings />

      <PopularBlogPosts />{/* blog posts */}
      <ContactForm />{/* form */}
    </Page>
  )
}
