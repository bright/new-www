import React from 'react'

import { ArrowLeft, ArrowRight } from '../../helpers/icons'
import { routeLinks } from '../../config/routing'
import { useWindowSize } from '../../components/utils/use-windowsize'
import * as styles from './Paging.module.scss'
import styled from 'styled-components'
import { usePagination, DOTS } from './use-pagination/use-pagination'
import classnames from 'classnames'
import variables from '../../styles/variables'
import { any, number } from 'prop-types'
import { useEffect } from 'react'
import { Link } from 'gatsby'

const PagingWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  margin: 6.5625rem 20%;

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
    margin-right: 1rem;

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
    filter: opacity(0.2);
    pointer-events: none;
  }
  & div {
    width: 100%;
    display: flex;
    justify-content: center;
    & > .dots {
      display: flex;
      align-items: flex-end;
      margin: 0 2.3125rem 0 1.3125rem;
      font-size: 1.375rem;
      font-weight: 600;
      color: #131214;
    }
  }
  @media ${variables.device.tablet} {
    height: 7.1875rem;
    width: 100%;
    margin: 5rem 0;
    justify-content: space-between;
    flex-direction: column;
    & .arrowwrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
      & > span > .button:first-of-type {
        width: 5.125rem;
      }
    }
    & div {
      flex-grow: 1;
      justify-content: center;

      & span {
        &:last-of-type .button {
          margin-right: 0;
        }
        & .button {
          width: 2rem;
          height: 2rem;
          margin-right: 0.6875rem;

          & span {
            font-size: 1rem;
          }
        }
      }
      & .dots {
        margin: 0 1.75rem 0 1.0625rem;
        font-size: 1rem;
        align-items: flex-start;
      }
    }
    & > span {
      align-self: flex-end;
      & .button {
        margin-right: 0;
      }
    }
  }
`
export interface PageContext {
  currentPage: 2
  limit: 10
  numPages: 21
  skip: 10
  tag?: string
  subTag?: string
}

export interface PagingProps {
  pageContext: PageContext
  baseURI: string
}

export const Paging: React.FC<PagingProps> = ({ pageContext, baseURI }) => {
  const { currentPage, numPages, tag } = pageContext
  const paginationRange = usePagination({
    currentPage: currentPage,
    totalPageCount: numPages,
    siblingCount: 1,
    pageSize: 10,
  })

  const prevHref = !tag && currentPage <= 2 ? baseURI : `${baseURI}${currentPage - 1}`
  const lastPage = paginationRange?.[paginationRange?.length - 1]
  const nextHref = `${baseURI}${currentPage + 1}`
  const { width } = useWindowSize()
  const breakpoint = 991
  if (width < breakpoint) {
    return (
      <PagingWrapper>
        <div>
          {paginationRange &&
            paginationRange.map((pageNumber: any, i: any) => {
              if (pageNumber === DOTS) {
                return (
                  <span key={pageNumber} className='pagination-item dots'>
                    &#8230;
                  </span>
                )
              }
              const pageNumberHref = !tag && i == 0 ? baseURI : `${baseURI}${pageNumber}`
              return (
                <span key={pageNumber}>
                  <Link to={pageNumberHref} className={currentPage == pageNumber ? 'button is-active' : 'button'}>
                    <span>{pageNumber}</span>
                  </Link>
                </span>
              )
            })}
        </div>
        <div className='arrowwrapper'>
          {' '}
          <span>
            <Link to={prevHref!} className={pageContext.currentPage <= 1 ? 'button is-shadow' : 'button'}>
              <span>back</span>
            </Link>
          </span>
          <span>
            <Link to={nextHref} className={pageContext.currentPage === lastPage ? 'button is-shadow' : 'button'}>
              <span>next</span>
            </Link>
          </span>
        </div>
      </PagingWrapper>
    )
  }

  return (
    <PagingWrapper>
      <span>
        <Link to={prevHref} className={pageContext.currentPage <= 1 ? 'button is-shadow' : 'button'}>
          <span>back</span>
        </Link>
      </span>
      <div>
        {paginationRange &&
          paginationRange.map((pageNumber: any, i: any) => {
            if (pageNumber == DOTS) {
              return (
                <span key={pageNumber} className='pagination-item dots'>
                  &#8230;
                </span>
              )
            }
            const pageNumberHref = !tag && i == 0 ? baseURI : `${baseURI}${pageNumber}`
            return (
              <span key={pageNumber}>
                <Link to={pageNumberHref} className={currentPage == pageNumber ? 'button is-active' : 'button'}>
                  <span>{pageNumber}</span>
                </Link>
              </span>
            )
          })}
      </div>
      <span>
        <Link to={nextHref} className={pageContext.currentPage === lastPage ? 'button is-shadow' : 'button'}>
          <span>next</span>
        </Link>
      </span>
    </PagingWrapper>
  )
}
