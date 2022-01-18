import React from 'react'
import classNames from 'classnames'

import { SocialIcons } from '../components/subcomponents/SocialIcons'

import EmailIcon from '../assets/email_white.svg'
import LocationIcon from '../assets/location_white.svg'
import LogoWhite from '../assets/logo_white_2.svg'
import { routeLinks } from '../config/routing'

import * as styles from './Footer.module.scss'
import AnalyticsLink from '../components/shared/AnalyticsLink'

export const Footer = () => {
  return (
    <footer className={classNames('footer', styles.container)}>
      <div className={styles.top}>
        <div className='columns'>
          <div className='column'>
            <div className={classNames('content image', styles.logo)}>
              <a href='/'>
                <LogoWhite style={{ width: '180px' }} />
              </a>
            </div>
            <SocialIcons className='padded-right' />
            {/*
            <div
              className='clutch-widget content'
              data-url='https://widget.clutch.co'
              data-widget-type='1'
              data-height='50'
              data-clutchcompany-id='32656'
            ></div> */}
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

          <div className={classNames('column is-hidden-mobile', styles.links)}>
            <h6 className='subtitle is-size-6 has-text-weight-bold'>explore more</h6>
            <p className='content'>
              <a href={routeLinks.aboutUs()}>about us</a>
            </p>
            <p className='content'>
              <a href={routeLinks.whatWeOffer}>what we offer</a>
            </p>
            <p className='content'>
              <a href={routeLinks.projects}>projects</a>
            </p>
            <p className='content'>
              <a href={routeLinks.career}>career</a>
            </p>
            <p className='content'>
              <a href={routeLinks.blog}>blog</a>
            </p>
          </div>

          <div className={classNames('column is-hidden-mobile', styles.links)}>
            <h6 className='subtitle is-size-6 has-text-weight-bold'>services</h6>
            <p className='content'>
              <a href={routeLinks.whatWeOffer}>web development</a>
            </p>
            <p className='content'>
              <a href={routeLinks.whatWeOffer}>mobile development</a>
            </p>
            <p className='content'>
              <a href={routeLinks.whatWeOffer}>consulting services</a>
            </p>
            <p className='content'>
              <a href={routeLinks.whatWeOffer}>UX/UI design</a>
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
                80-232 Gdańsk
              </div>
            </div>
            <div className={styles.icon}>
              <div className='left'>
                <EmailIcon />
              </div>
              <div className='right'>
                <AnalyticsLink
                  href='mailto:info@brightinventions.pl?subject=bright%20mail'
                  text='info@brightinventions.pl'
                  category='Click Email'
                  action='Click Business Email'
                />
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
          <a href={routeLinks.privacyPolicy} className='has-text-black-bis'>
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
