import React  from 'react'
import classNames from 'classnames'

import * as styles from './style.module.scss'

export const Logo: React.FC = () => {
    return (
        <a href='/' className={styles.brand}>
            <img className={classNames(styles.logo, styles.small)} src='/images/b_logo_black.svg'/>
            <img className={classNames(styles.logo, styles.big)} src='/images/bright_inventions_logo_500-01.png'/>
        </a>
    )
}
