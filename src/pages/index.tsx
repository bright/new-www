import React from 'react'

import {Page} from '../layout/Page'
import {HideTablet} from './shared'
import {Header} from './home/Header'
import {Achievements} from './home/Achievements'
import {Carousel} from './shared/Carousel'
import {TechnologyTags} from './shared/TechnologyTags'
import {OurServices} from './shared/OurServices'
import {ImageSpacer} from './shared/ImageSpacer'
import {Projects} from './home/Projects'
import Ratings from './shared/Ratings'

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
      <Projects />
      <Ratings />

      <PopularBlogPosts />{/* blog posts */}
      <ContactForm />{/* form */}
    </Page>
  )
}
