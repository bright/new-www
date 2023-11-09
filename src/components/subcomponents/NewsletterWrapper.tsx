import React, { useEffect, useState } from 'react'
import Newsletter from './Newsletter'

export default function NewsletterWrapper() {
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  // TODO: disable the newsletter until we have a new version
  // useEffect(() => {
  //   const scrollListener = () => {
  //     if (window.scrollY > 0 && !isScrolledDown) {
  //       setIsScrolledDown(true)
  //     } else {
  //       setIsScrolledDown(false)
  //     }
  //   }
  //   document.addEventListener('scroll', scrollListener)
  //   return () => {
  //     document.removeEventListener('scroll', scrollListener)
  //   }
  // }, [])

  return <>{isScrolledDown && <Newsletter />}</>
}
