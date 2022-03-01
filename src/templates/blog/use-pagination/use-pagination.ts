import React from 'react'
import { useMemo } from 'react'

export const DOTS = '...'

interface RangeItems {
  start: number
  end: number
}

const range = (rangeItems: RangeItems) => {
  const { end, start } = rangeItems
  let length: number = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

interface PaginationItems {
  totalPageCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}

export const usePagination = (paginationItems: PaginationItems) => {
  const { totalPageCount, pageSize, siblingCount, currentPage } = paginationItems
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return range({ start: 1, end: totalPageCount })
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex >= 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 1 + 2 * siblingCount
      let leftRange = range({ start: 1, end: leftItemCount })

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range({ start: totalPageCount - rightItemCount + 1, end: totalPageCount })
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range({ start: leftSiblingIndex, end: rightSiblingIndex })
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalPageCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
