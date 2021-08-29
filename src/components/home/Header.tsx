import React from 'react'
import classNames from 'classnames'

import { routeLinks } from '../../config/routing'
import { Section } from '../shared'
import styled from 'styled-components'
import * as styles from './Header.module.scss'
import variables from '../../styles/variables'

const HeroWrapper = styled.div`
  max-width: 1449px;
  @media ${variables.device.mobile} {
    max-width: 347px;
  }
`
const HeroBody = styled.div`
  padding: 0 19rem 0 6.5rem;
  @media ${variables.device.mobile} {
    padding: 8.94rem 2.56rem 0 0.625rem;
  }
`

export const Header = () => {
  return (
    <Section className={classNames(styles.header)}>
      <HeroBody className='hero-body'>
        <HeroWrapper>
          <div>
            <h1 className={classNames('title mt-6', styles.title)}>
              let's create software that <span>matters</span>
            </h1>
          </div>
        </HeroWrapper>
        <div className='buttons is-hidden-tablet'>
          <a className='button estimate is-primary' href={routeLinks.startProject}>
            <strong>estimate project</strong>
          </a>
        </div>
      </HeroBody>
    </Section>
  )
}
