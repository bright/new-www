import React  from 'react'
import classNames from 'classnames'

import {MenuElement} from '../TopNavigation'

import styles from './style.module.scss'

type Props = {
    opened: boolean
    elements: MenuElement[]
    currentPath: string
}

export const List: React.FC<Props> = ({opened, elements, currentPath}) => {
    const isCurrent = (link: string) => {
        return currentPath && currentPath.startsWith(link)
    }

    return (
        <div id='topNavBar' className={classNames({'is-active': opened})}>
            {elements.map(menuElement => (
                <a key={menuElement.link}
                   href={menuElement.link}
                   className={classNames('navbar-item is-expanded', styles.item, menuElement.className, {[styles.current]: isCurrent(menuElement.link)})}>
                    <span>{menuElement.title}</span>
                </a>
            ))}
        </div>
    )
}