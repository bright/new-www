import React, { useRef } from 'react'
import loadable from '@loadable/component'
import { Page } from '../layout/Page'
import { Header } from '../components/home/Header'
const Achievements = loadable(() => import('../components/home/Achievements'))
const TechnologyTags = loadable(() => import('../components/shared/TechnologyTags'))
import { OurServices } from '../components/home/OurServices'
import { Projects } from '../components/home/Projects'
const Ratings = loadable(() => import('../components/shared/Ratings'))
import { Contact } from '../components/shared/Contact'
const HeroHeaderImages = loadable(() => import('../components/home/HeroHeaderImages'))
const PopularBlogPosts = loadable(() => import('../components/home/PopularBlogPosts'))
import '../styles/_page-index.scss'
import { BlockchainExperts } from '../components/home/BlockchainExperts'
import { GlobalStyle } from '../styles/global'
import useOnScreen from '../components/utils/use-onscreen'

export default () => {
  const ref: any = useRef<HTMLDivElement>()
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '400px')
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
      <div ref={ref}>
        {onScreen ? (
          <Contact formButton='Business Contact Form Button' actionFormButton='Click Submit Business Form' />
        ) : (
          <div style={{ height: '400px' }}></div>
        )}
      </div>
    </Page>
  )
}
