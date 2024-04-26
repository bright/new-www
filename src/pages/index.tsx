import React, { Suspense } from 'react'
import '../styles/_page-index.scss'
import { Page } from '../layout/Page'
import { Header } from '../components/home/Header'
import { OurServices } from '../components/home/OurServices'
import { Projects } from '../components/home/Projects'
import { Contact } from '../components/shared/Contact'
import { Script } from 'gatsby'
import Ebook from '../components/home/Ebook'
import { SEO } from '../meta/SEO'
import { useLocation } from '@reach/router'
import { useTranslation } from 'react-i18next'
import { useClient } from '../hooks/useClient'

const Achievements = React.lazy(() => import('../components/home/Achievements'))
const TechnologyTags = React.lazy(() => import('../components/shared/TechnologyTags'))
const Ratings = React.lazy(() => import('../components/shared/Ratings'))
const PopularBlogPosts = React.lazy(() => import('../components/shared/PopularBlogPosts'))
const HeroHeaderImages = React.lazy(() => import('../components/home/HeroHeaderImages'))

export const Head = () => <SEO
  title='Software Development Company'
  description='Top custom software development company in Poland specialising in mobile & web apps, Blockchain, Bluetooth and IoT.'
  twitterType='summary_large_image'
/>

export default () => {
  const isClient = useClient()

  return (
    <Page className='page-index'>
      <Script type='text/javascript' src={'https://widget.clutch.co/static/js/widget.js'} async={true} />
      <Header />
      <Suspense>
        <Achievements />
        <HeroHeaderImages />
        <TechnologyTags />
      </Suspense>
      <OurServices />
      <Ebook />
      <Projects isSelectedTag={false} />
      <Suspense>
        <Ratings />
      </Suspense>
      {isClient && <>
        <PopularBlogPosts />
      </>}
      <Contact formButton='Business Contact Form Button' actionFormButton='Click Submit Business Form' />
    </Page>
  )
}
