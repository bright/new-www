import React from 'react'
import classNames from 'classnames'

import * as styles from './style.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

export const Logo: React.FC = () => {
  return (
    <Link to='/' className={styles.brand}>
      <StaticImage
        alt={'Bright Inventions logo'}
        className={classNames(styles.logo, styles.small)}
        src='../../../static/images/b_logo_black.svg'
      />
      <StaticImage
        alt={'Bright Inventions logo'}
        className={classNames(styles.logo, styles.big)}
        src='../../../static/images/bright_inventions_logo_500-01.png'
        loading='eager'
      />
    </Link>
  )
}
