import React from 'react'
import Ratings from '../components/shared/Ratings'
import Banners from '../components/whatWeDo/banners/Banners'
import { Contact } from '../components/shared/Contact'
import HowWeWork from '../components/whatWeDo/howWeWork/HowWeWork'
import OurDevelopmentAreas from '../components/whatWeDo/ourDevelopmentAreas/OurDevelopmentAreas'
import { CustomPageTitle, CustomSection, CustomSectionInner } from '../components/shared'
import TechnologyTags from '../components/shared/TechnologyTags'
import { Page } from '../layout/Page'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import { CustomTextRegular } from './../components/shared/index.styled'
import { Projects } from '../components/home/Projects'
import { Script } from 'gatsby'

const WhatWeOfferPage: React.FocusEventHandler = () => {
  return (
    <Page>
      <Script type='text/javascript' src={'https://widget.clutch.co/static/js/widget.js'} />
      <HelmetMetaData
        title='What We Offer'
        description='We specialise in Mobile App Development, IoT Development, Blockchain and Product Design. Contact us!'
      />

      <CustomSection
        paddingProps='4rem 0  4rem'
        paddingLaptop='2.8125 0  3.375rem'
        paddingTablet='3rem 2.25rem 2.75rem'
        paddingTabletXL='3.75rem 0 3rem'
      >
        <CustomPageTitle
          mobileFontSize='32px'
          tabletFontSize='38px'
          tabletXLFontSize='38px'
          laptopFontSize='44px'
          fontSize='48px'
        >
          our services
        </CustomPageTitle>
      </CustomSection>
      <CustomSection
        paddingProps='0 15rem 6.625rem'
        paddingLaptop='0 6rem 4rem'
        paddingTabletXL='0 9rem 4.875rem'
        paddingTablet='0 2.25rem 5.1875rem'
      >
        <CustomTextRegular>
          <CustomSectionInner>
            From concept to launch, we help organizations of all shapes and sizes build impactful digital products. Our
            clients – ranging from startups and consultancies to renowned NGOs and global organizations – operate in
            FinTech, Blockchain, HealthTech, Retail, Logistics, and more.
          </CustomSectionInner>
        </CustomTextRegular>
      </CustomSection>

      <OurDevelopmentAreas />
      <Banners />
      <HowWeWork />

      <TechnologyTags />
      <Projects />
      <Ratings />

      <Contact formButton='Business Contact Form Button' actionFormButton='Click Submit Business Form' />
    </Page>
  )
}

export default WhatWeOfferPage
