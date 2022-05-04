import React, { useEffect, useState } from 'react'
import Hotjar from './Hotjar'

export default function HotjarWrapper() {
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 0 && !isScrolledDown) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }
    }
    document.addEventListener('scroll', scrollListener)
    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [])
  return <>{isScrolledDown && <Hotjar />}</>
}
