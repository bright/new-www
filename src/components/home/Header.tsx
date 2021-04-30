import React from 'react'
import classNames from 'classnames'

import { routeLinks } from '../../config/routing'
import { Section } from '../shared'

import * as styles from './Header.module.scss'

export const Header = () => {
  return (
    <Section className={classNames(styles.header)}>
      <div className='hero-body'>
        <div className='container'>
          <div>
            <h1 className={classNames('title mt-6', styles.title)}>
              let's create software that <span>matters</span>
            </h1>
          </div>
          <div className='buttons is-hidden-tablet'>
            <a className='button estimate is-primary' href={routeLinks.startProject}>
              <strong>estimate project</strong>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
