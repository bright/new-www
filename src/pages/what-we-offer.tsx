import React from 'react'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import Ratings from './shared/Ratings'
import Banners from '../components/whatWeDo/banners/Banners'
import Contact from '../components/whatWeDo/contact/Contact'
import HowWeWork from '../components/whatWeDo/howWeWork/HowWeWork'
import OurDevelopmentAreas from '../components/whatWeDo/ourDevelopmentAreas/OurDevelopmentAreas'
import { HideTablet, PageDescription, Section } from './shared'
import { TechnologyTags } from './shared/TechnologyTags'
import { Carousel } from './shared/Carousel'
import { Page } from '../layout/Page'

const WhatWeOfferPage: React.FocusEventHandler = () => {
  return (
    <Page>
      <HelmetWrapper
        title="Mobile and Web Development Services"
        description="About our software development services"
      />
      <HideTablet>
        <Section>
          <PageDescription>
            We offer custom software development for organizations of all shapes
            and sizes – from emerging startups, mid-sized companies and
            consultancy agencies, to renowned NGOs and international
            organizations. Our clients come from multiple industries, including
            FinTech, Blockchain, HealthTech, Retail, Logistics, and more.
          </PageDescription>
        </Section>
      </HideTablet>

      <OurDevelopmentAreas/>
      <Banners/>
      <HowWeWork/>

      <HideTablet>
        <TechnologyTags/>
        <Carousel/>
        <Ratings/>
      </HideTablet>

      <Contact/>
    </Page>
  )
}

export default WhatWeOfferPage
