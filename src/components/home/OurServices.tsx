import React from 'react'
import { Link } from 'gatsby'
import {
  MoreButton,
  CustomSection,
  CustomTextTitle,
  CustomTextRegular,
  CustomSectionTitle,
  CustomContainer,
} from '../shared'
import { routeLinks } from '../../config/routing'
import * as styles from './ourServices/OurServices.module.scss'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { StaticImage } from 'gatsby-plugin-image'

const AiDevelopmentIcon = () => <StaticImage src={'../../../static/images/ai_development_icon_update.png'} alt={'AI development'} />
const IotDevelopmentIcon = () => <StaticImage src={'../../../static/images/iot_development2.png'} alt={'IoT development'} />
const CustomSoftwareDevelopmentIcon = () => <StaticImage src={'../../../static/images/custom_software_development2.png'} alt={'Custom software development'} />
const ProductWorkshopIcon = () => <StaticImage src={'../../../static/images/product_workshops2.png'} alt={'product workshops'} />

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
    icon: CustomSoftwareDevelopmentIcon,
    title: 'custom software development',
    description:
      'Our custom software serves the unique processes of your business, solves particular problems and makes your workflows more efficient. We will help you throughout all of the software delivery phases.',
    direction: '/our-areas/custom-software-development',
  },
  {
    icon: ProductWorkshopIcon,
    title: 'product workshops',
    description:
      'We will help you discover your product idea, set your product goals, understand the pitfalls and find the solution on how to make your product better.',
    direction: '/our-areas/product-design',
  },
  {
    icon: AiDevelopmentIcon,
    title: 'AI solutions',
    description:
      'We build secure AI solutions. From generative AI & machine learning to prompt engineering, we will enhance your business with AI.',
    direction: '/our-areas/ai-software-development',
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
