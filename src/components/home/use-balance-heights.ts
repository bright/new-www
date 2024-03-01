import { RefObject, useEffect } from 'react'
import { useWindowSize } from '../utils/use-windowsize'

const extractFromLink = (el?: HTMLElement) => {
  if (!el) return

  if (el.tagName === 'DIV') return el

  return el.firstChild as HTMLElement | undefined
}

export const useBalanceHeights = (ref:  RefObject<HTMLDivElement>) => {
  const windowSize = useWindowSize()

  useEffect(() => {
    const firstEl = extractFromLink(ref.current?.firstChild as HTMLElement | undefined)
    const lastEl = extractFromLink(ref.current?.lastChild as HTMLElement | undefined)
    const secondToLastEl = ref.current?.lastChild?.previousSibling as HTMLDivElement | undefined
    const isChildCountEven = (ref.current?.childElementCount || 0) % 2 === 0

    if (!firstEl || !lastEl || !secondToLastEl) return;

    firstEl.style.height = ''
    lastEl.style.height = ''

    const firstElRect = firstEl.getBoundingClientRect();
    const lastElRect = lastEl.getBoundingClientRect();
    const secondToLastElRect = secondToLastEl.getBoundingClientRect();
    const bottomDiff = secondToLastElRect?.bottom - lastElRect.bottom;
    const growingEl = (bottomDiff > 0) === isChildCountEven ? lastEl : firstEl;
    const growingElRect = (bottomDiff > 0) === isChildCountEven ? lastElRect : firstElRect;

    growingEl.style.height = growingElRect.height + Math.abs(bottomDiff) + "px";
  }, [windowSize, ref.current])
}