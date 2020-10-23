import React, { useState } from "react"
import classNames from 'classnames'

import styles from './TopNavigation.module.scss'

interface MenuElement {
  title: string
  link: string
  className?: string
}

const TopMenu: MenuElement[] = [
      {link: '/about-us', title: 'why us'},
      {link: '/what-we-offer', title: 'what we do'},
      {link: '/projects', title: 'case studies'},
      {link: '/career', title: 'career'},
      {link: '/blog', title: 'blog'},
      {link: '/start-project', title: 'estimate project', className: classNames('is-primary', styles.estimate)},
]

type Props = {
  path?: string
  toggled: (value: boolean) => void
}

export const TopNavigation: React.FC<Props> = ({path, toggled}) => {
  const [menuOpened, setMenuOpened] = useState(false)

  const toggleMenu = () => {
    // const newValue = !showMenu
    // setShowMenu(newValue)
    // toggled(newValue)
  }

  // return (
  //     <nav className={classNames('navbar is-fixed-top', styles.container, {[styles.opened]: menuOpened})}
  // )

  return (
    <nav
      className={classNames('navbar is-fixed-top', styles.container, {[styles.opened]: menuOpened})}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item is-expanded" href="/">
          <img className="navbar-logo" src="/images/bright_inventions_logo_500-01.png"/>
        </a>

        <a
          role="button"
          className={"navbar-burger burger " + (menuOpened ? "is-active" : "")}
          aria-label="menu"
          aria-expanded="false"
          data-target="#topNavBar"
          onClick={toggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="topNavBar" className={"navbar-menu " + (menuOpened ? "is-active" : "")}>

        <div className={classNames('navbar-start', styles.navbarItems)}>
          {TopMenu.map(menuElement => (
            <div key={menuElement.link} className={classNames('navbar-item is-expanded', styles.item)}>
              <a className={classNames(
                     'button',
                     menuElement.className,
                     {[styles.current]: path && path.startsWith(menuElement.link)},
                 )}
                 href={menuElement.link}>
                {menuElement.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
