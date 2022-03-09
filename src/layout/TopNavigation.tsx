import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { Logo } from './TopNavigation/Logo'
import { Burger } from './TopNavigation/Burger'
import { List } from './TopNavigation/List'
import { routeLinks } from '../config/routing'

import * as styles from './TopNavigation/style.module.scss'

export interface MenuElement {
  title: string
  link: string
  className?: string
}

const TopMenu: MenuElement[] = [
  { link: routeLinks.aboutUs(), title: 'why us' },
  { link: routeLinks.whatWeOffer, title: 'what we do' },
  { link: routeLinks.projects, title: 'case studies' },
  { link: routeLinks.career, title: 'career' },
  { link: routeLinks.blog, title: 'blog' },
  { link: routeLinks.startProject, title: 'estimate project', className: classNames('is-primary', styles.estimate) },
]

type Props = {
  path?: string
  toggled: (value: boolean) => void
}

export const TopNavigation: React.FC<Props> = ({ path, toggled }) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10 && !isScrolledDown) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }
    }
    document.addEventListener('scroll', scrollListener)
    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [])

  const toggleMenu = () => {
    const newValue = !menuOpened
    setMenuOpened(newValue)
    toggled(newValue)
  }

  return (
    <nav
      className={classNames('navbar is-fixed-top', styles.container, {
        [styles.hasShadow]: isScrolledDown,
      })}
      role='navigation'
      aria-label='main navigation'
    >
      <Logo />
      <Burger opened={menuOpened} toggle={toggleMenu} />
      <List opened={menuOpened} elements={TopMenu} currentPath={path || ''} />
    </nav>
  )
}
