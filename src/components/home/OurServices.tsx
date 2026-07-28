import React from 'react'
import { Link } from '../shared/SiteLink'
import {
  MoreButton,
  CustomSection,
  CustomTextTitle,
  CustomTextRegular,
  CustomSectionTitle,
  CustomContainer,
} from '../shared'
import MobileAppDevelopmentIcon from '../../assets/mobileAppDevelopment.svg'
import WebDevelopmentIcon from '../../assets/webDevelopment.svg'
import { routeLinks } from '../../config/routing'
import * as styles from './ourServices/OurServices.module.scss'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { StaticImage } from 'gatsby-plugin-image'

const AiDevelopmentIcon = () => <StaticImage src={'../../../static/images/ai_development_icon_update.png'} alt={'AI development'} />
const IotDevelopmentIcon = () => <StaticImage src={'../../../static/images/iot_development2.png'} alt={'IoT development'} />

const OurTextTitle = styled(CustomTextTitle)`
  color: ${variables.color.text};
  margin-top: ${variables.pxToRem(30)};
  margin-bottom: ${variables.pxToRem(53)};
  &:hover {
    color: ${variables.color.primary};
    transition: color 300ms;
  }
  @media ${variables.device.laptop} {
    padding-top: 0;
    text-align: center;
    margin-top: ${variables.pxToRem(25)};
    margin-bottom: ${variables.pxToRem(36)};
  }
  @media ${variables.device.tabletXL} {
    margin-top: ${variables.pxToRem(20)};
    margin-bottom: ${variables.pxToRem(30)};
  }
  @media ${variables.device.mobile} {
    padding-top: 0;
    text-align: center;
    margin-top: ${variables.pxToRem(18)};
    margin-bottom: ${variables.pxToRem(28)};
  }
`

const OurSerwicesTextRegular = styled(CustomTextRegular)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
  color: ${variables.color.text};
  overflow: hidden;
  @media ${variables.device.tablet} {
    padding-top: 0;
  }
  @media ${variables.device.mobile} {
    padding-top: 0;
    text-align: left;
  }
`

const services = [
  {
    icon: MobileAppDevelopmentIcon,
    title: 'mobile development',
    description:
      'We offer native mobile app development for iOS and Android. Our app development team has broad experience in building applications in Swift, Java, and Kotlin.',
    direction: '/our-areas/mobile-app-development',
  },
  {
    icon: AiDevelopmentIcon,
    title: 'AI solutions',
    description:
      'We build secure AI solutions. From generative AI & machine learning to prompt engineering, we will enhance your business with AI.',
    direction: '/our-areas/ai-software-development',
  },
  {
    icon: WebDevelopmentIcon,
    title: 'web development',
    description:
      'We provide a wide range of custom full stack web development services. We rely on a rich technology stack, including JavaScript, CSS, HTML, Java, Node.js, AWS, MySQL, PostgreSQL, and more.',
    direction: '/our-areas/web-development',
  },
  {
    icon: IotDevelopmentIcon,
    title: 'IoT solutions',
    description:
      'We specialise in the Internet of Things solutions. We build IoT software for restaurants, retail, eHealth and fintech industries.',
    direction: '/our-areas/iot-development',
  },
]

export const OurServices: React.FC = () => {
  return (
    <CustomSection className='has-text-centered'>
      <CustomContainer>
        <CustomSectionTitle>our services</CustomSectionTitle>
        <div className={styles.seviceswrapper}>
          {services.map((service, index) => (
            <Link to={service.direction} key={index} className={styles.service}>
              <div>
                <service.icon />
              </div>
              <OurTextTitle>{service.title}</OurTextTitle>
              <OurSerwicesTextRegular>{service.description}</OurSerwicesTextRegular>
            </Link>
          ))}
        </div>

        <MoreButton className='servicesbutton' href={routeLinks.whatWeOffer}>
          explore our services
        </MoreButton>
      </CustomContainer>
    </CustomSection>
  )
}
