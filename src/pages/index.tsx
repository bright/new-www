import React from 'react'

import {Page} from '../layout/Page'
import { HideTablet } from './shared/TabletHide'
import {Header} from './home/Header'
import {Achievements} from './home/Achievements'
import {Carousel} from './shared/Carousel'
import {TechnologyTags} from './shared/TechnologyTags'
import {OurServices} from './shared/OurServices'
import {ImageSpacer} from './shared/ImageSpacer'

import ContactForm from '../components/home/ContactForm'
import PopularBlogPosts from '../components/home/PopularBlogPosts'
import SuccessStories from '../components/home/SuccessStories'
import Ratings from './shared/Ratings'

import '../styles/_page-index.scss'

export default () => {
  return (
    <Page className="page-index">
      <Header />{/* OK */}
      <Achievements />{/* OK */}
      <HideTablet>{/* OK */}
          <Carousel />{/* OK */}
          <TechnologyTags />{/* OK */}
      </HideTablet>{/* OK */}

      <OurServices />{/* OK */}
      <ImageSpacer />{/* OK */}
      <SuccessStories />{/* projects */}

      <Ratings />{/* OK */}

      <PopularBlogPosts />{/* blog posts */}
      <ContactForm />{/* form */}
    </Page>
  )
}
