import { useState, useEffect } from 'react'

const SESSION_STORAGE_KEY = 'framna-announcement-shown'
const ANNOUNCEMENT_START_DATE_PRODUCTION = new Date('2026-03-18T00:00:00Z')

/**
 * Checks if the announcement should be shown based on the environment and date
 */
function shouldShowBasedOnDate(): boolean {
  const gatsbyActiveEnv = process.env.GATSBY_ACTIVE_ENV as 'production' | 'staging' | 'develop' | undefined

  // In staging or development, always show (no date restriction)
  if (gatsbyActiveEnv === 'staging' || gatsbyActiveEnv === 'develop' || !gatsbyActiveEnv) {
    return true
  }

  // In production, only show after the start date
  if (gatsbyActiveEnv === 'production') {
    const now = new Date()
    return now >= ANNOUNCEMENT_START_DATE_PRODUCTION
  }

  return false
}

/**
 * Checks if the announcement has already been shown in this session
 */
function hasBeenShownInSession(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true'
  } catch (e) {
    // If sessionStorage is not available, don't show
    console.error('Failed to access sessionStorage:', e)
    return true
  }
}

/**
 * Marks the announcement as shown in the current session
 */
function markAsShown(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
  } catch (e) {
    console.error('Failed to set sessionStorage:', e)
  }
}

/**
 * Hook to manage the Framna announcement modal state
 * Returns [isOpen, closeModal]
 */
export function useFramnaAnnouncement(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      return
    }

    // Check if we should show the announcement
    const shouldShow = shouldShowBasedOnDate() && !hasBeenShownInSession()

    if (shouldShow) {
      // Show modal after page fully loads (slight delay to ensure everything is ready)
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000) // 1 second delay after page load

      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    markAsShown()
  }

  return [isOpen, closeModal]
}
