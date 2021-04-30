import React from "react"
import classNames from "classnames"

import { MenuElement } from "../TopNavigation"

import * as styles from "./style.module.scss"
import { Link } from "gatsby"

type Props = {
  opened: boolean
  elements: MenuElement[]
  currentPath: string
}

export const List: React.FC<Props> = ({ opened, elements, currentPath }) => {
  const isCurrent = (link: string) => {
    return currentPath && currentPath.includes(link.split("/")[1])
  }

  return (
    <div id="topNavBar" className={classNames({ "is-active": opened })}>
      {elements.map(menuElement => (
        <Link
          key={menuElement.link}
          to={menuElement.link}
          className={classNames(
            "navbar-item is-expanded",
            styles.item,
            menuElement.className,
            { [styles.current]: isCurrent(menuElement.link) }
          )}
        >
          <span>{menuElement.title}</span>
        </Link>
      ))}
    </div>
  )
}
