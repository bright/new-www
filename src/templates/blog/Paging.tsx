import React from 'react'

import {ArrowLeft, ArrowRight} from '../../helpers/icons'
import { routeLinks } from '../../config/routing'

import styles from './Paging.module.scss'

export interface PageContext {
    currentPage: 2
    limit: 10
    numPages: 21
    skip: 10
}

export const Paging: React.FC<PageContext> = (pageContext) => {
    const prevHref =  `${routeLinks.blog}/${pageContext.currentPage - 1 > 1 ? pageContext.currentPage - 1 : ''}`
    const nextHref =  `${routeLinks.blog}/${pageContext.currentPage + 1}`

    return (
        <div className={styles.paging}>
            {pageContext.currentPage > 1 && (
                <span>
                    <a href={prevHref} className='button'>
                        <ArrowLeft />
                        <span>Previous</span>
                    </a>
                </span>
            )}
            {pageContext.numPages > pageContext.currentPage && (
                <span>
                    <a href={nextHref} className='button'>
                        <span>Next</span>
                        <ArrowRight />
                    </a>
                </span>
            )}
        </div>
    )
}
