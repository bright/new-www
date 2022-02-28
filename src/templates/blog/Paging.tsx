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

  max-width: ${variables.pxToRem(581)};
  gap: ${variables.pxToRem(82)};
  margin-left: auto;
  margin-right: auto;
  margin-top: ${variables.pxToRem(105)};
  margin-bottom: ${variables.pxToRem(185)};

  & span {
    & .button {
      font-weight: 600;
      transition: all ease-out 0.3s;
      width: fit-content;
      font-size: ${variables.pxToRem(18)};
      padding: 0;
      margin: 0;
      & :hover span {
        color: ${variables.color.primary};
      }
    }
  }
  & div {
    & span {
      & .button {
        width: fit-content;
        padding: 0;
        font-weight: normal;
        transition: all ease-out 0.3s;
        & :hover span {
          color: ${variables.color.text};
          font-weight: 600;
        }
      }
    }
  }

  & .button {
    width: 2.5625rem;
    height: 2.5625rem;
    -webkit-appearance: none;
    align-items: center;
    border: none;
    box-shadow: none;
    display: flex;
    justify-content: center;
    position: relative;
    vertical-align: top;
    margin-right: 1rem;

    & span {
      font-size: ${variables.pxToRem(18)};
      line-height: ${variables.pxToRem(22)};
      color: ${variables.color.text};
    }
  }
  & .is-active {
    & span {
      color: ${variables.color.text};
      text-decoration: underline;
      font-weight: 600;
    }
  }
  & .is-shadow {
    color: #131214;
    filter: opacity(0.2);
    pointer-events: none;
  }
  & div {
    width: 100%;
    display: flex;
    gap: ${variables.pxToRem(34)};
    justify-content: center;
    align-items: center;
    & > .dots {
      display: flex;
      align-items: flex-end;
      justify-content: center;

      font-size: 1.375rem;
      font-weight: 600;
      color: ${variables.color.text};
    }
  }
  @media ${variables.device.laptop} {
    margin-top: ${variables.pxToRem(82)};
    margin-bottom: ${variables.pxToRem(116)};
  }

  @media ${variables.device.tablet} {
    gap: ${variables.pxToRem(100)};
    align-items: center;
    max-width: 100%;
    & div {
      gap: 0;

      & span {
        flex-basis: calc(100% / 6);
        & .button {
          width: -webkit-fill-available;
        }
      }
    }
  }
  @media ${variables.device.mobile} {
    margin-top: ${variables.pxToRem(66)};
    margin-bottom: ${variables.pxToRem(85)};
    gap: 14.25%;

    & div {
      gap: 0;
      & span {
        flex-basis: calc(100% / 5);
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
  const { width } = useWindowSize()
  const breakpoint = 992
  const paginationRange = usePagination({
    currentPage: currentPage,
    totalPageCount: numPages,
    siblingCount: width <= 580 ? 0 : width <= breakpoint ? 1 : 2,
    pageSize: 10,
  })

  const prevHref = !tag && currentPage <= 2 ? baseURI : `${baseURI}${currentPage - 1}`
  const lastPage = paginationRange?.[paginationRange?.length - 1]
  const nextHref = `${baseURI}${currentPage + 1}`

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
                <span key={pageNumber + '-' + i} className='pagination-item dots'>
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
