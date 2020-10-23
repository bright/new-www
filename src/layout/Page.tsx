import React from 'react'

import {Footer} from './Footer'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import {TopNavigation} from '../components/subcomponents/TopNavigation'

import '../styles/main.scss'

export const Page: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div className={"layout-container " + className}>
      <HelmetWrapper
        title="Software Development Company"
        description="The best custom software development company in Poland. Through mobile apps and complex backend systems to emerging technology solutions we are creating success stories for startups, consultancy agencies as well as mid-size organisations across multiple industries including FinTech, Blockchain, HealthTech, Retail, Logistics and more."
      />
      <TopNavigation />
      {children}
      <Footer />
    </div>
  )
}
