import React from 'react'
import classNames from 'classnames'

import {MoreButton, Section, SectionTitle, TextTitle, TextRegular} from '../shared'
import BlockchainIcon from '../../assets/blockchain.svg'
import MobileAppDevelopmentIcon from '../../assets/mobileAppDevelopment.svg'
import ProductDesignIcon from '../../assets/productDesign.svg'
import WebDevelopmentIcon from '../../assets/webDevelopment.svg'
import { routeLinks } from '../../config/routing'

import * as styles from './ourServices/OurServices.module.scss'

const services = [
  {
    icon: WebDevelopmentIcon,
    title: 'web development',
    description: 'We provide a wide range of custom full stack web development services. We rely on a rich technology stack, including JavaScript, CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL, and more.'
  },
  {
    icon: MobileAppDevelopmentIcon,
    title: 'mobile development',
    description: 'We offer native mobile app development for iOS and Android. Our app development team has broad experience in building applications in Swift, Java, and Kotlin.'
  },
  {
    icon: ProductDesignIcon,
    title: 'product design',
    description: 'You can count on our expertise in interface analysis, animation design, UX and UI design, root cause analysis, and more. We have worked on design projects of all sizes.'
  },
  {
    icon: BlockchainIcon,
    title: 'blockchain',
    description: 'Our team has a vast experience in blockchain projects, including the development of a solution for a global humanitarian organization. Blockchain technology is what we’re really good at!'
  },
]

export const OurServices: React.FC = () => {
  return (
    <Section className='has-text-centered'>
      <SectionTitle>our services</SectionTitle>
      <div className='columns is-multiline has-justify-content-center'>
        {services.map((service, index) => (
          <div className={classNames('column is-half', styles.service)} key={index}>
            <div className={styles.icon}><service.icon /></div>
            <TextTitle>{service.title}</TextTitle>
            <TextRegular>{service.description}</TextRegular>
          </div>
        ))}
      </div>
      <MoreButton href={routeLinks.whatWeOffer}>learn more</MoreButton>
    </Section>
  )
}
