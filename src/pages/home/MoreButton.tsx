import {Link} from 'gatsby'
import React from 'react'
import classNames from 'classnames'

import styles from './MoreButton.module.scss'

interface Props {
    href: string
    text?: string
}

export const MoreButton: React.FC<Props> = ({href, text, children}) => {
    return (
        <div className={classNames('column is-full has-text-centered', styles.moreButton)}>
            <Link to={href}>
                <button>{text || children}</button>
            </Link>
        </div>
    )
}
