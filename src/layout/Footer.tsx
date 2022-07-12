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

const FooterWrapper = styled.footer`
  && .column:first-of-type {
    @media ${variables.device.tabletXL} {
      flex-basis: 20%;
    }
    @media ${variables.device.tablet} {
      flex-basis: auto;
    }
  }
  && .column.is-hidden {
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

export const Footer = () => {
  return (
    <FooterWrapper className={classNames('footer', styles.container)}>
      <div className={styles.top}>
        <div className='columns'>
          <div className='column'>
            <div className={classNames('content image', styles.logo)}>
              <a href='/'>
                <LogoWhite style={{ width: '180px' }} />
              </a>
            </div>
            <SocialIcons className='padded-right' />
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

          <div className={classNames('column is-hidden', styles.links)}>
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
              <Link to={routeLinks.career}>career</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.blog}>blog</Link>
            </p>
          </div>

          <div className={classNames('column is-hidden', styles.links)}>
            <h6 className='subtitle is-size-6 has-text-weight-bold'>services</h6>
            <p className='content'>
              <Link to={routeLinks.webDevelopment}>web development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.mobileDevelopment}>mobile development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.blockchainDevelopment}>blockchain development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.bluetoothDevelopment}>bluetooth development</Link>
            </p>
            <p className='content'>
              <Link to={routeLinks.mvpdDevelopment}>MVP development</Link>
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
                <a href='mailto:info@brightinventions.pl?subject=bright%20mail'>info@brightinventions.pl</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>
          © {new Date().getFullYear()} Bright Inventions. All rights reserved. <br />
          We use cookies to ensure that we give you the best experience on our website. If you continue to use this site
          we will assume that you are happy with it.
          <Link to={routeLinks.privacyPolicy} className='has-text-black-bis'>
            Privacy Policy
          </Link>
        </div>
      </div>
    </FooterWrapper>
  )
}
