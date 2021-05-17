import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { Footer } from './Footer'
import { TopNavigation } from './TopNavigation'

import * as styles from './Page.module.scss'
import '../styles/main.scss'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import Helmet from 'react-helmet'
import { fbCompatibleBrightLogoShortBlack } from '../meta/bright-logo'
import { resolveUrl } from '../meta/resolve-url'
import { useLocation } from '@reach/router'

export const Page: React.FC<{ className?: string }> = ({
                                                         children,
                                                         className
                                                       }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

  const { pathname } = useLocation()


  return (
    <div
      className={classNames('layout-container', className, {
        [styles.menuOpened]: mobileMenuOpened
      })}
    >
      <HelmetTitleDescription
        title='Software Development Company'
        description='The best custom software development company in Poland. Through mobile apps and complex backend systems to emerging technology solutions we are creating success stories for startups, consultancy agencies as well as mid-size organisations across multiple industries including FinTech, Blockchain, HealthTech, Retail, Logistics and more.'
      />
      <Helmet>
        <meta property='og:image' content={resolveUrl(fbCompatibleBrightLogoShortBlack)} />
        <meta property='og:url' content={resolveUrl(pathname)} />
      </Helmet>
      <TopNavigation path={pathname} toggled={setMobileMenuOpened} />
      {children}
      <Footer />
    </div>
  )
}
