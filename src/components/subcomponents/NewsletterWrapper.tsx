import React, { useEffect, useState } from 'react'
import Newsletter from './Newsletter'

export default function NewsletterWrapper() {
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

  return <>{isScrolledDown && <Newsletter />}</>
}
