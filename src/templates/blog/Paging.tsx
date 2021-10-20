import React from 'react'

import { ArrowLeft, ArrowRight } from '../../helpers/icons'
import { routeLinks } from '../../config/routing'

import * as styles from './Paging.module.scss'

export interface PageContext {
  currentPage: 2
  limit: 10
  numPages: 21
  skip: 10
  tag?: String
  baseURI?: String
}

export interface PagingProps {
  pageContext: PageContext
  isSelectedTags: boolean
}

export const Paging: React.FC<PagingProps> = ({ pageContext, isSelectedTags }) => {
  const { currentPage, numPages, tag } = pageContext

  const prevHref = isSelectedTags
    ? `${routeLinks.blogTags({ tag: tag?.toLowerCase() })}${currentPage - 1 > 1 ? currentPage - 1 : ''}`
    : `${routeLinks.blog}/${currentPage - 1 > 1 ? currentPage - 1 : ''}`

  const nextHref = isSelectedTags
    ? `${routeLinks.blogTags({ tag: tag?.toLowerCase() })}${currentPage + 1}`
    : `${routeLinks.blog}/${currentPage + 1}`

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i < numPages + 1; i++) {
      if (((i < currentPage + 3 || i == numPages) && i > currentPage - 1) || i == 1) {
        const pageNumberHref = isSelectedTags
          ? `${routeLinks.blogTags({ tag: tag.toLowerCase() })}${i}`
          : `${routeLinks.blog}/${i}`
        const pageNumbersComponent = (
          <span>
            <a href={pageNumberHref} className='button'>
              <span>{i}</span>
            </a>
          </span>
        )
        pageNumbers.push(pageNumbersComponent)
      }
    }
    return pageNumbers
  }
  const numPagesNumber = renderPageNumbers()

  return (
    <div className={styles.paging}>
      <span>
        <a href={prevHref} className='button'>
          <ArrowLeft />
          <span>Previous</span>
        </a>
      </span>
      {numPagesNumber.map(el => el)}
      <span>
        <a href={nextHref} className='button'>
          <span>Next</span>
          <ArrowRight />
        </a>
      </span>
    </div>
  )
}
