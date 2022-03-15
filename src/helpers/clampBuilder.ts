import { useState } from 'react'

export function clampBuilder(
  minWidthPx: number,
  maxWidthPx: number,
  minFontSizePx: number,
  maxFontSizePx: number
): string {
  const isSSR = typeof window !== 'undefined'

  const root = (isSSR ? document.querySelector('html') : null) as Element
  const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2))

  const minWidth = minWidthPx / pixelsPerRem
  const maxWidth = maxWidthPx / pixelsPerRem
  const maxFontSize = maxFontSizePx / pixelsPerRem
  const minFontSize = minFontSizePx / pixelsPerRem

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minFontSize

  return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSize}rem )`
}
