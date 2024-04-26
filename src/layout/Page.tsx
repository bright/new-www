import React, { PropsWithChildren, useState } from 'react'
import classNames from 'classnames'
import { Footer } from './Footer'
import { TopNavigation } from './TopNavigation'
import * as styles from './Page.module.scss'
import '../styles/main.scss'
import { useLocation } from '@reach/router'
import { MDXComponentsWrapper } from '../mdx'
import CookiesNotice from '../analytics/cookies-notice'

export const Page: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false)
  const { pathname } = useLocation()

  return (
    <div
      className={classNames('layout-container', className, {
        [styles.menuOpened]: mobileMenuOpened,
      })}
    >
      <TopNavigation path={pathname} toggled={setMobileMenuOpened} />
      <MDXComponentsWrapper>{children}</MDXComponentsWrapper>
      <CookiesNotice />
      <Footer />
    </div>
  )
}
