import React from 'react'

import {Page} from '../layout/Page'
import {Header} from './home/Header'
import {Achievements} from './home/Achievements'
import {Carousel} from './home/Carousel'
import {OurServices} from './home/OurServices'

import ClutchInfo from '../components/home/ClutchInfo'
import Cocoaheads from '../components/home/Cocoaheads'
import ContactForm from '../components/home/ContactForm'
import ImageSpacer from '../components/home/ImageSpacer'
import PopularBlogPosts from '../components/home/PopularBlogPosts'
import ProductIdea from '../components/home/ProductIdea'
import SuccessStories from '../components/home/SuccessStories'
import Ratings from '../components/subcomponents/Ratings'

import '../styles/_page-index.scss'

export default () => {
    return (
        <Page className="page-index">
            <Header/>
            <Achievements/>
            <Carousel />
            <Achievements/>{/* TAGS COMPONENT */}
            <OurServices/>

            <ImageSpacer/>
            <SuccessStories/>
            <Ratings/>
            <ClutchInfo/>
            <ProductIdea/>
            <PopularBlogPosts/>
            <Cocoaheads/>
            <ContactForm/>
        </Page>
    )
}
