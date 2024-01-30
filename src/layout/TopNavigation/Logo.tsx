import React from 'react'
import classNames from 'classnames'

import * as styles from './style.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

export const Logo: React.FC = () => {
  return (
    <Link to='/' className={styles.brand} aria-label='Go to home page' role={'navigation'}>
      <StaticImage
        alt={'Bright Inventions logo'}
        className={styles.logo}
        src='../../../static/images/bright_inventions_logo_500-01.png'
        loading='eager'
        backgroundColor='#ffffff'
        placeholder='none'
      />
      Home Page
    </Link>
  )
}
