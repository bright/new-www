import React from 'react'

import { ArrowLeft, ArrowRight } from '../../helpers/icons'
import { routeLinks } from '../../config/routing'

import * as styles from './Paging.module.scss'
import styled from 'styled-components'
import { usePagination, DOTS } from './use-pagination/use-pagination'
import classnames from 'classnames'

const PagingWrapper = styled.div`
  & > span > .button:first-of-type {
    width: 5.125rem;
  }
  & .button {
    width: 2.5625rem;
    height: 2.5625rem;
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid #131214;
    border-radius: 0;
    box-shadow: none;
    display: flex;
    justify-content: center;
    position: relative;
    vertical-align: top;

    & span {
      font-size: 1.375rem;
      line-height: 1.6875rem;
      color: #131214;
    }
  }
  & .is-active {
    background-color: #131214;
    & span {
      color: #ffff;
    }
  }
  & .is-shadow {
    border: 1px solid #131214;
    color: #131214;
    filter: opacity(0.4);
  }
  & div > .dots {
    display: flex;
    align-items: flex-end;
    margin: 0 2.3125rem 0 1.3125rem;
    font-size: 1.375rem;
    font-weight: 600;
    color: #131214;
  }
`
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
  const paginationRange = usePagination({
    currentPage: currentPage,
    totalCount: numPages * 10,
    siblingCount: 1,
    pageSize: 10,
  })

  const prevHref = `${baseURI}${currentPage - 1 > 1 ? currentPage - 1 : ''}`

  const nextHref = `${baseURI}${currentPage + 1}`

  return (
    <PagingWrapper className={styles.paging}>
      <span>
        <a href={prevHref} className={pageContext.currentPage > 1 ? 'button is-shadow' : 'button'}>
          <span>back</span>
        </a>
      </span>
      <div>
        {paginationRange &&
          paginationRange.map((pageNumber: any, i: any) => {
            if (pageNumber == DOTS) {
              return <span className='pagination-item dots'>&#8230;</span>
            }
            const pageNumberHref = !tag && i == 0 ? baseURI : `${baseURI}${pageNumber}`
            return (
              <span>
                <a href={pageNumberHref} className={currentPage == i + 1 ? 'button is-active' : 'button'}>
                  <span>{pageNumber}</span>
                </a>
              </span>
            )
          })}
      </div>
      <span>
        <a href={nextHref} className='button'>
          <span>next</span>
        </a>
      </span>
    </PagingWrapper>
  )
}
