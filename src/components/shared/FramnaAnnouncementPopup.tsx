import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'framna_announcement_shown_at'
const SHOW_DURATION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const PRODUCTION_SHOW_DATE = new Date('2026-03-18T00:00:00')

function shouldShowPopup(): boolean {
  const isStaging = process.env.GATSBY_ACTIVE_ENV === 'staging'
  const now = new Date()

  if (!isStaging && now < PRODUCTION_SHOW_DATE) {
    return false
  }

  try {
    const shownAt = localStorage.getItem(STORAGE_KEY)
    if (!shownAt) return true
    const shownAtMs = parseInt(shownAt, 10)
    return now.getTime() - shownAtMs > SHOW_DURATION_MS
  } catch {
    return true
  }
}

function markShown(): void {
  try {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
  } catch {
    // ignore storage errors
  }
}

export const FramnaAnnouncementPopup: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    const show = () => {
      timer = setTimeout(() => {
        if (shouldShowPopup()) {
          setVisible(true)
          markShown()
        }
      }, 500)
    }

    if (document.readyState === 'complete') {
      show()
    } else {
      window.addEventListener('load', show, { once: true })
    }

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer)
      }
      window.removeEventListener('load', show)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={() => setVisible(false)}
    >
      <div
        style={{
          display: 'flex',
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: '700px',
          width: '90%',
          backgroundColor: '#fff',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left green panel */}
        <div
          style={{
            backgroundColor: '#1BC866',
            flex: '0 0 45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 32px',
            minHeight: '320px',
          }}
        >
          <img
            src='/images/why-us/timeline/framna.svg'
            alt='Framna'
            style={{ maxWidth: '160px', width: '100%' }}
          />
        </div>

        {/* Right white panel */}
        <div
          style={{
            flex: '1',
            padding: '40px 36px 40px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setVisible(false)}
            aria-label='Close'
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              lineHeight: '1',
              padding: '4px',
              color: '#000',
            }}
          >
            ✕
          </button>

          <h2
            style={{
              margin: '0 0 20px',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: '1.2',
            }}
          >
            Bright Inventions is now Framna
          </h2>

          <p
            style={{
              margin: '0 0 32px',
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#333',
            }}
          >
            We partner with industry leaders (and those about to be) to create digital products that
            define markets, reshape industries, and drive meaningful growth.
          </p>

          <a
            href='https://framna.com/'
            target='_blank'
            style={{
              display: 'inline-block',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '32px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '15px',
              alignSelf: 'flex-start',
            }}
          >
            Visit Framna
          </a>
        </div>
      </div>
    </div>
  )
}
