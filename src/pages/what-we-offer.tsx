import React from 'react'
import Ratings from '../components/shared/Ratings'
import Banners from '../components/whatWeDo/banners/Banners'
import { Contact } from '../components/shared/Contact'
import HowWeWork from '../components/whatWeDo/howWeWork/HowWeWork'
import OurDevelopmentAreas from '../components/whatWeDo/ourDevelopmentAreas/OurDevelopmentAreas'
import { HideTablet, PageDescription, Section } from '../components/shared'
import { TechnologyTags } from '../components/shared/TechnologyTags'
import { Carousel } from '../components/shared/Carousel'
import { Page } from '../layout/Page'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'

const WhatWeOfferPage: React.FocusEventHandler = () => {
  return (
    <Page>
      <HelmetTitleDescription
        title='Mobile and Web Development Services'
        description='About our software development services'
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

      <OurDevelopmentAreas />
      <Banners />
      <HowWeWork />

      <TechnologyTags />
      <Carousel />
      <Ratings />

      <Contact />
    </Page>
  )
}

export default WhatWeOfferPage
