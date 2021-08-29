import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import {
  MoreButton,
  CustomSection,
  CustomTextTitle,
  CustomTextRegular,
  CustomSectionTitle,
  CustomContainer,
} from '../shared'
import AgileWorkshopsIcon from '../../assets/agileWorkshops.svg'
import MobileAppDevelopmentIcon from '../../assets/mobileAppDevelopment.svg'
import ProductDesignIcon from '../../assets/productDesign.svg'
import WebDevelopmentIcon from '../../assets/webDevelopment.svg'
import { routeLinks } from '../../config/routing'
import * as styles from './ourServices/OurServices.module.scss'
import styled from 'styled-components'
import variables from '../../styles/variables'

const OurTextTitle = styled(CustomTextTitle)`
  color: var(--black);
  &:hover {
    color: ${variables.color.primary};
    transition: color 300ms;
  }
  @media ${variables.device.mobile} {
    padding-top: 0;
    text-align: center;
    font-size: ${variables.font.customtext.sizeOurServicesMobile};
    margin: 1.5rem 0;
  }
`

const OurSerwicesTextRegular = styled(CustomTextRegular)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-top: 2.2rem;
  text-align: left;
  color: var(--black-200);
  overflow: hidden;
  @media ${variables.device.mobile} {
    padding-top: 0;
    text-align: center;
    font-size: ${variables.font.customtext.sizeOurServicesMobile};
    line-height: 1.75rem;
  }
`

const ServiceLink = styled(Link)`
  
  }
`
const services = [
  {
    icon: WebDevelopmentIcon,
    title: 'web development',
    description:
      'We provide a wide range of custom full stack web development services. We rely on a rich technology stack, including JavaScript, CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL, and more.',
    direction: '/our-areas/web-development',
  },
  {
    icon: MobileAppDevelopmentIcon,
    title: 'mobile development',
    description:
      'We offer native mobile app development for iOS and Android. Our app development team has broad experience in building applications in Swift, Java, and Kotlin.',
    direction: '/our-areas/mobile-app-development',
  },
  {
    icon: ProductDesignIcon,
    title: 'product design',
    description:
      'You can count on our expertise in interface analysis, animation design, UX and UI design, root cause analysis, and more. We have worked on design projects of all sizes.',
    direction: '/our-areas/product-design',
  },
  {
    icon: AgileWorkshopsIcon,
    title: 'agile workshops',
    description:
      'Our customers come from all sorts of industries and disciplines, both technical and non-technical. However, regardless of their background…',
    direction: '/our-areas/agile-workshops',
  },
]

export const OurServices: React.FC = () => {
  return (
    <CustomSection className='has-text-centered'>
      <CustomContainer>
        <CustomSectionTitle>our services</CustomSectionTitle>
        <div className={styles.seviceswrapper}>
          {services.map((service, index) => (
            <div className={styles.service} key={index}>
              <ServiceLink to={service.direction}>
                <div className={styles.icon}>
                  <service.icon />
                </div>
                <OurTextTitle>{service.title}</OurTextTitle>
                <OurSerwicesTextRegular>{service.description}</OurSerwicesTextRegular>
              </ServiceLink>
            </div>
          ))}
        </div>
        <ServiceLink to={routeLinks.whatWeOffer}>
          <MoreButton className='servicesbutton'>learn more</MoreButton>
        </ServiceLink>
      </CustomContainer>
    </CustomSection>
  )
}
