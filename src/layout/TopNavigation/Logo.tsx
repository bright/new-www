import React from 'react'
import classNames from 'classnames'

import * as styles from './style.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { FramnaLink as Link } from '../../framna/FramnaLink'

export const Logo: React.FC = () => {
  return (
    <Link to='/blog/bright-inventions-joins-leading-digital-product-agency-framna/' className={styles.brand} aria-label='Go to home page' role={'navigation'}>
      <StaticImage
        alt={'Bright Inventions logo'}
        className={styles.logo}
        src='../../../static/images/bright-inventions-we-are-now-framna.svg'
        loading='eager'
        objectFit='contain'
        backgroundColor='#ffffff'
        placeholder='none'
      />
      Home Page
    </Link>
  )
}
