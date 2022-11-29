import React, { PropsWithChildren, useState } from 'react'
import classNames from 'classnames'

import { Footer } from './Footer'
import { TopNavigation } from './TopNavigation'

import * as styles from './Page.module.scss'
import '../styles/main.scss'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import Helmet from 'react-helmet'
import { fbShareImage } from '../meta/bright-logo'
import { resolveUrl } from '../meta/resolve-url'
import { useLocation } from '@reach/router'
import { MDXComponentsWrapper } from '../mdx'
import CookiesNotice from '../analytics/cookies-notice'
import { isBrowser } from '../utils'

export const Page: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

  const { pathname } = useLocation()

  return (
    <div
      className={classNames('layout-container', className, {
        [styles.menuOpened]: mobileMenuOpened,
      })}
    >
      <HelmetMetaData
        title='Software Development Company'
        description='Top custom software development company in Poland specialising in mobile & web apps, Blockchain, Bluetooth and IoT.'
      />
      <Helmet>
        <meta property='og:image' content={resolveUrl(fbShareImage)} />
        <meta property='og:url' content={resolveUrl(pathname)} />
        {/* Ideally simply adding import("https://widget.clutch.co/static/js/widget.js") would work */}
        <script type='text/javascript' src={'https://widget.clutch.co/static/js/widget.js'} defer={true} />
      </Helmet>
      <TopNavigation path={pathname} toggled={setMobileMenuOpened} />
      <MDXComponentsWrapper>{children}</MDXComponentsWrapper>
      {isBrowser() ? <CookiesNotice /> : <div></div>}
      <Footer />
    </div>
  )
}
