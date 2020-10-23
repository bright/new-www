import React, {useEffect, useState} from 'react'
import classNames from 'classnames'

import {Footer} from '../components/subcomponents/Footer'
import HelmetWrapper from '../components/subcomponents/HelmetWrapper'
import {TopNavigation} from './TopNavigation'

import '../styles/main.scss'
import styles from './Page.module.scss'

export const Page: React.FC<{ className?: string }> = ({children, className}) => {
    const [currentPath, setCurrentPath] = useState<string>()
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [window.location.pathname])

    return (
        <div className={classNames('layout-container', className, {[styles.menuOpened]: mobileMenuOpened})}>
            <HelmetWrapper
                title="Software Development Company"
                description="The best custom software development company in Poland. Through mobile apps and complex backend systems to emerging technology solutions we are creating success stories for startups, consultancy agencies as well as mid-size organisations across multiple industries including FinTech, Blockchain, HealthTech, Retail, Logistics and more."
            />
            <TopNavigation path={currentPath} toggled={setMobileMenuOpened} />
            {children}
            <Footer />
        </div>
    )
}
