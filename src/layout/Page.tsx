import React, { PropsWithChildren, useState } from 'react'
import classNames from 'classnames'

import { Footer } from './Footer/Footer'
import { TopNavigation } from './TopNavigation'

import * as styles from './Page.module.scss'
import '../styles/main.scss'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import { useLocation } from '@reach/router'
import { MDXComponentsWrapper } from '../mdx'
import CookiesNotice from '../analytics/cookies-notice'
import { useTranslation } from 'react-i18next'
import FramnaAnnouncementPopup from '../components/shared/FramnaAnnouncementPopup'

export const Page: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false)
  const { i18n } = useTranslation()
  const { pathname } = useLocation()

  return (
    <div
      className={classNames('layout-container', className, {
        [styles.menuOpened]: mobileMenuOpened,
      })}
    >
      <HelmetMetaData
        title='Digital Product Agency'
        language={i18n.language}
        description='Top digital product agency in Poland specialising in mobile & web apps, AI and IoT.'
        url={pathname}
        twitterType='summary_large_image'
      />

      <TopNavigation path={pathname} toggled={setMobileMenuOpened} />
      <MDXComponentsWrapper>{children}</MDXComponentsWrapper>
      <CookiesNotice />
      <Footer />
      <FramnaAnnouncementPopup />
    </div>
  )
}
