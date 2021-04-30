import React  from 'react'
import classNames from 'classnames'

import * as styles from './style.module.scss'

type Props = {
    opened: boolean
    toggle: () => void
}

export const Burger: React.FC<Props> = ({opened, toggle}) => {
    return (
        <a role='button'
           className={classNames('navbar-burger burger', styles.burger, {'is-active': opened})}
           aria-label='menu'
           aria-expanded='false'
           data-target='#topNavBar'
           onClick={toggle}>
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
        </a>
    )
}
