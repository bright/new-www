import React from 'react'
import { useEffect, useState } from 'react'

interface WindowSize {
  width: number | null
}

export const useWindowSize = (): WindowSize => {
  const isSSR = typeof window !== 'undefined'
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isSSR ? window.innerWidth : null,
  })
  console.log(windowSize)

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth })
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize)

    return () => {
      window.removeEventListener('resize', changeWindowSize)
    }
  }, [])

  return windowSize
}
