import { Link } from 'gatsby'
import React from 'react'
import AgileWorkshops from '../../../assets/agileWorkshops.svg'
import Blockchain from '../../../assets/blockchain.svg'
import CustomSoftwareDevelopment from '../../../assets/customSoftwareDevelopment.svg'
import MobileAppDevelopment from '../../../assets/mobileAppDevelopment.svg'
import ProductDesign from '../../../assets/productDesign.svg'
import RightArrow from '../../../assets/rightArrow.svg'
import WebDevelopment from '../../../assets/webDevelopment.svg'
import {
  DevelopmentAreasWrapper,
  DevelopmentAreasContainer,
  DevelopmentAreaContainer,
  SectionTitleContainer,
  SectionText,
  GoToContainer,
  Title,
} from './styles'

const services = [
  {
    icon: WebDevelopment,
    title: 'web development',
    text:
      'We provide a wide range of custom full stack web development services. We rely on a rich technology stack, including JavaScript, CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL, and more.',
    link: '/our-areas/web-development',
    mobileIcon: { width: '77px', height: '72px' },
  },
  {
    icon: MobileAppDevelopment,
    title: 'mobile app development',
    text:
      'We offer native mobile app development for iOS and Android. Our app development team has broad experience in building applications in Swift, Java, and Kotlin.',
    link: '/our-areas/mobile-app-development',
    mobileIcon: { width: '93px', height: '75px' },
  },
  {
    icon: ProductDesign,
    title: 'product design',
    text:
      'You can count on our expertise in interface analysis, animation design, UX and UI design, root cause analysis, and more. We have worked on design projects of all sizes.',
    link: '/our-areas/product-design',
    mobileIcon: { width: '71px', height: '72px' },
  },
  {
    icon: Blockchain,
    title: 'blockchain',
    text:
      'Our team has a vast experience in blockchain projects, including the development of a solution for a global humanitarian organization. Blockchain technology is what we’re really good at!',
    link: '/our-areas/blockchain',
    mobileIcon: { width: '72px', height: '61px' },
  },
  {
    icon: CustomSoftwareDevelopment,
    title: 'custom software development',
    text:
      'Our custom software serves the unique processes of your business, solves particular problems and makes your workflows more efficient. We help you throughout all of the software delivery phases.',
    link: '/our-areas/custom-software-development',
    mobileIcon: { width: '81px', height: '84px' },
  },
  {
    icon: AgileWorkshops,
    title: 'agile workshops',
    text:
      "We'll be more than delighted to organise Agile workshops for you and your team and help you quickly get a grasp of this leading project management methodology brings to the table.",
    link: '/our-areas/agile-workshops',
    mobileIcon: { width: '52px', height: '65px' },
  },
]

const OurDevelopmentAreas = () => {
  return (
    <DevelopmentAreasWrapper>
      <DevelopmentAreasContainer>
        {services.map(service => (
          <DevelopmentAreaContainer key={service.title}>
            <SectionTitleContainer
              iconMobileWidth={service.mobileIcon.width}
              iconMobileHeight={service.mobileIcon.height}
            >
              <service.icon />
              <Title>{service.title}</Title>
            </SectionTitleContainer>
            <Link to={service.link}>
              <SectionText>{service.text}</SectionText>
            </Link>
            <Link to={service.link}>
              <GoToContainer>
                <RightArrow />
              </GoToContainer>
            </Link>
          </DevelopmentAreaContainer>
        ))}
      </DevelopmentAreasContainer>
    </DevelopmentAreasWrapper>
  )
}

export default OurDevelopmentAreas
