import { useState, useEffect, MutableRefObject } from 'react'

export default function useOnScreen<T extends Element>(ref: MutableRefObject<T | undefined | null>, rootMargin: string = '0px'): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (!isIntersecting) {
          setIntersecting(entry.isIntersecting)
        }
      },
      {
        rootMargin,
      }
    )
    const current = ref.current
    if (current) {
      observer.observe(current)
    }
    return () => {
      if(current) {
        observer.unobserve(current)
      }
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting
}
