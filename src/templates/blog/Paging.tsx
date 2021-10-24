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
  subTag?: String
}

export interface PagingProps {
  pageContext: PageContext
  baseURI: String
}

export const Paging: React.FC<PagingProps> = ({ pageContext, baseURI }) => {
  const { currentPage, numPages, tag } = pageContext

  const prevHref = `${baseURI}${currentPage - 1 > 1 ? currentPage - 1 : ''}`
  // const prevHref = isSelectedTags
  //   ? `${routeLinks.blogTags({ tag: tag?.toLowerCase() })}${currentPage - 1 > 1 ? currentPage - 1 : ''}`
  //   : `${routeLinks.blog}/${currentPage - 1 > 1 ? currentPage - 1 : ''}`

  const nextHref = `${baseURI}${currentPage + 1}`
  // const nextHref = isSelectedTags
  //   ? `${routeLinks.blogTags({ tag: tag?.toLowerCase() })}${currentPage + 1}`
  //   : `${routeLinks.blog}/${currentPage + 1}`

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i < numPages + 1; i++) {
      if (((i < currentPage + 3 || i == numPages) && i > currentPage - 1) || i == 1) {
        const pageNumberHref = `${baseURI}${i}`
        const pageNumbersComponent = (
          <span>
            <a href={pageNumberHref} className={pageContext.currentPage == i ? 'button is-active' : 'button'}>
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
        <a href={prevHref} className={pageContext.currentPage > 1 ? 'button' : 'button is-shadow'}>
          <span>back</span>
        </a>
      </span>
      <div>{numPagesNumber.map(el => el)}</div>
      <span>
        <a href={nextHref} className='button'>
          <span>next</span>
        </a>
      </span>
    </div>
  )
}
