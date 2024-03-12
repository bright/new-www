import React, { Suspense, useEffect, useState } from 'react'

import { Page } from '../layout/Page'
import { Header } from '../components/home/Header'
const Achievements = React.lazy(() => import('../components/home/Achievements'))
const TechnologyTags = React.lazy(() => import('../components/shared/TechnologyTags'))
import { OurServices } from '../components/home/OurServices'
import { Projects } from '../components/home/Projects'
const Ratings = React.lazy(() => import('../components/shared/Ratings'))
import { Contact } from '../components/shared/Contact'
// const HeroHeaderImages = React.lazy(() => import('../components/home/HeroHeaderImages'))
const PopularBlogPosts = React.lazy(() => import('../components/home/PopularBlogPosts'))
import '../styles/_page-index.scss'
// import { BlockchainExperts } from '../components/home/BlockchainExperts'
import { Script } from 'gatsby'
import Ebook from '../components/home/Ebook'
const BlockchainExperts = React.lazy(() => import('../components/home/BlockchainExperts'))
const HeroHeaderImages = React.lazy(() => import('../components/home/HeroHeaderImages'))

  export default () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])

    return (
      <Page className='page-index'>
        <Script type='text/javascript' src={'https://widget.clutch.co/static/js/widget.js'} async={true} />
        <Header />
        <Suspense fallback={<div>loading...</div>}>
          <Achievements />
          <HeroHeaderImages />
          <TechnologyTags />
        </Suspense>
        <OurServices />
        <Ebook />
        <Suspense fallback={<div>loading...</div>}>
          <BlockchainExperts />
        </Suspense>
        <Projects isSelectedTag={false} />
        <Suspense fallback={<div>loading...</div>}>
          <Ratings />
        </Suspense>
        {isClient && <>
          <PopularBlogPosts />
        </>}
        <Contact formButton='Business Contact Form Button' actionFormButton='Click Submit Business Form' />
      </Page>
    )
}
