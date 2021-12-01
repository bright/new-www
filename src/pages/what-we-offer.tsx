import React from 'react'
import Ratings from '../components/shared/Ratings'
import Banners from '../components/whatWeDo/banners/Banners'
import { Contact } from '../components/shared/Contact'
import HowWeWork from '../components/whatWeDo/howWeWork/HowWeWork'
import OurDevelopmentAreas from '../components/whatWeDo/ourDevelopmentAreas/OurDevelopmentAreas'
import { CustomSection, HideTablet, CustomPageTitle, CustomPageDescription } from '../components/shared'
import { TechnologyTags } from '../components/shared/TechnologyTags'
import { Carousel } from '../components/shared/Carousel'
import { Page } from '../layout/Page'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'

const WhatWeOfferPage: React.FocusEventHandler = () => {
  return (
    <Page>
      <HelmetTitleDescription
        title='What We Offer'
        description='We specialise in Mobile App Development, IoT Development, Blockchain and Product Design. Contact us!'
      />
      <HideTablet>
        <CustomSection paddingProps='3.3125rem 0  2.125rem'>
          <CustomPageTitle>our services</CustomPageTitle>
        </CustomSection>
        <CustomSection>
          <CustomPageDescription>
            We offer custom software development for organizations of all shapes and sizes – from emerging startups,
            mid-sized companies and consultancy agencies, to renowned NGOs and international organizations. Our clients
            come from multiple industries, including FinTech, Blockchain, HealthTech, Retail, Logistics, and more.
          </CustomPageDescription>
        </CustomSection>
      </HideTablet>

      <OurDevelopmentAreas />
      <Banners />
      <HowWeWork />

      <TechnologyTags />
      <HideTablet>
        <Carousel />
        <Ratings />
      </HideTablet>

      <Contact />
    </Page>
  )
}

export default WhatWeOfferPage
