import React, { useState } from 'react'
import {
  Box,
  ContentWrapper,
  ContactButton,
  Header,
  Wrapper,
  InnerContent,
  ExaggeratedLink,
  Partners,
  Disclaimer,
  List,
  DesktopOnlyBox,
  PartnerLink,
} from './Footer.styled'
import LyviaLogo from '../../assets/a_part_of_lyvia_white_1.svg'
import { FooterLogo } from './FooterLogo'
import { RedirectIcon } from './RedirectIcon'
import { Socials } from './Socials'
import ForbesDiamondBadge from '../../assets/forbes_badge.svg'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { ModalCookies } from '../../analytics/modal-cookies'

export const Footer = () => {
  const [isCookiesModalOpen, setCookiesModalOpen] = useState(false)

  function openModal() {
    setCookiesModalOpen(true)
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Box style={{ gridArea: 'contact-us' }}>
          <InnerContent>
            <Header>contact us</Header>
            <div>scrolled all over to the footer, might as well say hi!</div>
          </InnerContent>

          <Link to={routeLinks.startProject}>
            <ContactButton>
              <span>let’s talk</span>
              <RedirectIcon />
            </ContactButton>
          </Link>
        </Box>

        <DesktopOnlyBox style={{ gridArea: 'explore-more' }}>
          <Header>explore more</Header>
          <List>
            <li>
              <Link to={routeLinks.aboutUs()}>about us</Link>
            </li>
            <li>
              <Link to={routeLinks.whatWeOffer}>what we offer</Link>
            </li>
            <li>
              <Link to={routeLinks.projects}>projects</Link>
            </li>
            <li>
              <Link to={routeLinks.career()}>career</Link>
            </li>
            <li>
              <Link to={routeLinks.blog}>blog</Link>
            </li>
            <li>
              <a
                href='https://bright-dev-newsletter.getresponsepages.com/'
                target='_blank'
                rel='noopener noreferrer nofollow'
              >
                newsletter
              </a>
            </li>
            <li>
              <Link to={routeLinks.agencyGdansk}>software development studio in Gdansk</Link>
            </li>
          </List>
        </DesktopOnlyBox>

        <DesktopOnlyBox style={{ gridArea: 'services' }}>
          <Header>services</Header>
          <List>
            <li>
              <Link to={routeLinks.webDevelopment}>web development</Link>
            </li>
            <li>
              <Link to={routeLinks.mobileDevelopment}>mobile development</Link>
            </li>
            <li>
              <Link to={routeLinks.healthcareDevelopment}>healthcare software development</Link>
            </li>
            <li>
              <Link to={routeLinks.bluetoothDevelopment}>bluetooth development</Link>
            </li>
            <li>
              <Link to={routeLinks.mvpdDevelopment}>MVP development agency</Link>
            </li>
          </List>
        </DesktopOnlyBox>

        <Box style={{ gridArea: 'head-office' }}>
          <InnerContent>
            <Header>head office</Header>
            <div>
              <ExaggeratedLink href='https://maps.app.goo.gl/H95HmNS38u5nEikf9' target='_blank'>
                ul. Jana Matejki 12, 80-232 Gdańsk, Poland
              </ExaggeratedLink>
            </div>
          </InnerContent>
        </Box>

        <Box style={{ gridArea: 'reach-us' }}>
          <InnerContent>
            <Header>reach us here </Header>
            <div>
              <ExaggeratedLink href='mailto:info@bright.dev'>info@bright.dev</ExaggeratedLink>
            </div>

            <Socials />
          </InnerContent>
        </Box>

        <Box style={{ gridArea: 'disclaimer' }}>
          <Partners>
            <PartnerLink
              href='https://www.lyviagroup.com'
              target='_blank'
              rel='noopener noreferrer nofollow'
              style={{ width: '60px'}}
            >
              <LyviaLogo />
            </PartnerLink>

            <PartnerLink
              href='/blog/bright-inventions-recognized-in-forbes-diamonds-2024/'
              target='_blank'
              rel='noopener noreferrer nofollow'
              style={{ width: '72px'}}
            >
              <ForbesDiamondBadge />
            </PartnerLink>

            <PartnerLink
              href='https://partners.amazonaws.com/partners/0010h00001hdw3OAAQ/Bright%20Inventions'
              target='_blank'
              rel='noopener noreferrer nofollow'
              style={{ width: '46px'}}
            >
              <img src={'/images/aws-partner-black.png'} alt='Bright Inventions AWS Partner Network' />
            </PartnerLink>
          </Partners>

          <Disclaimer>
            © 2024 Bright Inventions. All rights reserved. We use cookies to ensure that we give you the best experience
            on our website. You can change your cookie preferences&nbsp;
            <ExaggeratedLink onClick={openModal} as={'span'}>
              here
            </ExaggeratedLink>
            .
            <ModalCookies modalIsOpen={isCookiesModalOpen} closeModal={setCookiesModalOpen} />
            <br />
            <br />
            <Link to={routeLinks.privacyPolicy}>Privacy Policy</Link>
          </Disclaimer>
        </Box>
      </ContentWrapper>

      <FooterLogo />
    </Wrapper>
  )
}
