import { basePx } from './../styles/variables'

export function clampBuilder(
  minWidthPx: number,
  maxWidthPx: number,
  minFontSizePx: number,
  maxFontSizePx: number
): string {
  const pixelsPerRem = basePx

  const minWidth = minWidthPx / pixelsPerRem
  const maxWidth = maxWidthPx / pixelsPerRem
  const maxFontSize = maxFontSizePx / pixelsPerRem
  const minFontSize = minFontSizePx / pixelsPerRem

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minFontSize

  return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSize}rem )`
}
