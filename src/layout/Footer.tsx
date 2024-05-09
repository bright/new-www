import React from 'react'
import classNames from 'classnames'

import { SocialIcons } from '../components/subcomponents/SocialIcons'

import EmailIcon from '../assets/email_white.svg'
import LocationIcon from '../assets/location_white.svg'
import LogoWhite from '../assets/logo_white_2.svg'
import { routeLinks } from '../config/routing'

import styled from 'styled-components'
import variables from '../styles/variables'
import * as styles from './Footer.module.scss'
import { Link } from 'gatsby'
import { ModalCookies } from '../analytics/modal-cookies'
import LyviaIconAndBadges from '../components/subcomponents/LyviaIconAndBadges'


const FooterWrapper = styled.footer`
  && .column:first-of-type {
    @media ${variables.device.tabletXL} {
      flex-basis: 20%;
    }
    @media ${variables.device.tablet} {
      flex-basis: auto;
    }
  }
  && .column.hidden {
    display: block;
    @media ${variables.device.tablet} {
      display: none;
    }
  }
  && .columns {
    @media ${variables.device.tablet} {
      display: flex;
      flex-direction: column;
    }
  }
`
const FooterOpenModalButton = styled.button`
  all: unset;
  text-decoration: underline;
  cursor: pointer;
  padding-left: ${variables.pxToRem(5)};
  &:hover {
    color: ${variables.color.primary};
  }
`

export const Footer = () => {
  const [isCookiesModalOpen, setCookiesModalOpen] = React.useState(false)

  function openModal() {
    setCookiesModalOpen(true)
  }

  return (
    <FooterWrapper className={classNames('footer', styles.container)}>
      <div className={styles.top}>
        <div className='columns'>
          <div className='column'>
            <div className={classNames('content image', styles.logo)}>
              <Link to='/' aria-label='Go to home page' role={'navigation'}>
                <LogoWhite style={{ width: '180px' }} />
                Home Page
              </Link>
            </div>
            <SocialIcons className='padded-right' />
            <LyviaIconAndBadges />
          </div>

          {/* <div className='column has-text-centered'>
            <a href='/projects'>
              <h4 className='subtitle is-size-4 has-text-weight-bold'>
                our latest project
              </h4>
              <figure className='image'>
                <img src='/images/Asset-7.svg' width='245' />
              </figure>
            </a>
          </div> */}

          <div className={classNames('column hidden', styles.links)}>
            <h6 className='subtitle is-size-6 has-text-weight-bold'>explore more</h6>
            <p className='content'>
              <Link to={routeLinks.aboutUs()}>about us</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.whatWeOffer}>what we offer</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.projects}>projects</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.career()}>career</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.blog}>blog</Link>
            </p>
            <p className='content'>
              <a href='https://bright-dev-newsletter.getresponsepages.com/' target='_blank' rel='noopener noreferrer nofollow'>newsletter</a>
            </p>
            <p className='content'>
              <Link to={routeLinks.agencyGdansk}>software development studio in Gdansk</Link>
            </p>
          </div>

          <div className={classNames('column hidden', styles.links)}>
            <h6 className='subtitle is-size-6 has-text-weight-bold'>services</h6>
            <p className='content'>
              <Link to={routeLinks.webDevelopment}>web development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.mobileDevelopment}>mobile development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.healthcareDevelopment}>healthcare software development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.bluetoothDevelopment}>bluetooth development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.mvpdDevelopment}>MVP development agency</Link>
            </p>
          </div>

          <div className={classNames('column', styles.links)}>
            <h6 className='subtitle is-size-6 has-text-weight-bold is-hidden-mobile'>contact</h6>
            <div className={styles.icon}>
              <div className='left'>
                <LocationIcon />
              </div>
              <div className='right'>
                ul. Jana Matejki 12, <br />
                80-232 Gdańsk, Poland
              </div>
            </div>
            <div className={styles.icon}>
              <div className='left'>
                <EmailIcon />
              </div>
              <div className='right'>
                <a href='mailto:info@bright.dev?subject=bright%20mail'>info@bright.dev</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>
          © {new Date().getFullYear()} Bright Inventions. All rights reserved. <br />
          We use cookies to ensure that we give you the best experience on our website. You can change your cookie
          preferences
          <FooterOpenModalButton type='button' onClick={openModal}>
            {' '}
            here
          </FooterOpenModalButton>
          .
          <ModalCookies modalIsOpen={isCookiesModalOpen} closeModal={setCookiesModalOpen} />
          <Link to={routeLinks.privacyPolicy} className='has-text-black-bis' style={{ marginTop: '8px' }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </FooterWrapper>
  )
}
