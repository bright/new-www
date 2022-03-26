import React from 'react'
import loadable from '@loadable/component'
import { Page } from '../layout/Page'
import { Header } from '../components/home/Header'
import { Achievements } from '../components/home/Achievements'
import { TechnologyTags } from '../components/shared/TechnologyTags'
import { OurServices } from '../components/home/OurServices'
import { Projects } from '../components/home/Projects'
// import Ratings from '../components/shared/Ratings'
const Ratings = loadable(() => import('../components/shared/Ratings'))
import { Contact } from '../components/shared/Contact'
import HeroHeaderImages from '../components/home/HeroHeaderImages'
import { PopularBlogPosts } from '../components/home/PopularBlogPosts'
import '../styles/_page-index.scss'
import { BlockchainExperts } from '../components/home/BlockchainExperts'
import { GlobalStyle } from '../styles/global'
export default () => {
  return (
    <Page className='page-index'>
      <GlobalStyle />
      <Header />
      <Achievements />
      <HeroHeaderImages />
      <TechnologyTags />
      <OurServices />
      <BlockchainExperts />
      <Projects />
      <Ratings />
      <PopularBlogPosts />
      <Contact formButton='Business Contact Form Button' actionFormButton='Click Submit Business Form' />
    </Page>
  )
}
