import React from 'react'
import { useEffect, useState } from 'react'

interface WindowSize {
  width: number
  height?: number
}

export const useWindowSize = (options?: { initialWidth?: number }): WindowSize => {
  const isSSR = typeof window !== 'undefined'
  const withValueFallback = options?.initialWidth || 500;
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isSSR ? window.innerWidth : withValueFallback,
    height: isSSR ? window.innerHeight : 500,
  })

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize)

    return () => {
      window.removeEventListener('resize', changeWindowSize)
    }
  }, [])

  return windowSize
}
