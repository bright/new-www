import React from 'react'

import {Page} from '../layout/Page'
import {Header} from '../components/home/Header'
import {Achievements} from '../components/home/Achievements'
import {Carousel} from '../components/shared/Carousel'
import {TechnologyTags} from '../components/shared/TechnologyTags'
import {OurServices} from '../components/home/OurServices'
import {ImageSpacer} from '../components/shared/ImageSpacer'
import {Projects} from '../components/home/Projects'
import Ratings from '../components/shared/Ratings'
import {Contact} from '../components/shared/Contact'
import { HideTablet } from '../components/shared'

import PopularBlogPosts from '../components/home/PopularBlogPosts'

import '../styles/_page-index.scss'
export default () => {
  return (
    <Page className="page-index">
      <Header />
      <Achievements />
      <HideTablet>
        <Carousel />
      </HideTablet>
      <TechnologyTags />
      <OurServices />
      <ImageSpacer />

      <Projects />
      <Ratings />

      <PopularBlogPosts />
      <Contact />
    </Page>
  )
}
