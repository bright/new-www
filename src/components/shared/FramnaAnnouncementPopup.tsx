import React, { useEffect, useState } from 'react'

const SESSION_KEY = 'framna_announcement_shown'

// Show from 18.03.2026 in production; on staging show immediately
const SHOW_FROM = new Date('2026-03-18T00:00:00Z')

function isStaging(): boolean {
  return process.env.GATSBY_ACTIVE_ENV === 'staging'
}

function shouldShowByDate(): boolean {
  if (isStaging()) return true
  return new Date() >= SHOW_FROM
}

const FramnaAnnouncementPopup: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!shouldShowByDate()) return
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) return

    const show = () => {
      setTimeout(() => {
        setVisible(true)
      }, 500)
    }

    if (document.readyState === 'complete') {
      show()
    } else {
      window.addEventListener('load', show, { once: true })
      return () => window.removeEventListener('load', show)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, '1')
    }
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          display: 'flex',
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: '640px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left green panel */}
        <div
          style={{
            backgroundColor: '#5EE03A',
            flex: '0 0 45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            minHeight: '280px',
          }}
        >
          <FramnaLogo />
        </div>

        {/* Right white panel */}
        <div
          style={{
            backgroundColor: '#ffffff',
            flex: '1',
            padding: '40px 32px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label='Close'
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1,
              fontSize: '20px',
              color: '#000',
            }}
          >
            ✕
          </button>

          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: '0 0 16px 0',
              color: '#000',
            }}
          >
            Bright Inventions is now Framna
          </h2>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              margin: '0 0 28px 0',
              color: '#333',
            }}
          >
            We partner with industry leaders (and those about to be) to create digital products that
            define markets, reshape industries, and drive meaningful growth.
          </p>

          <a
            href='https://framna.com/'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'inline-block',
              backgroundColor: '#000',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
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

const FramnaLogo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    {/* Framna sprout icon */}
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16 28V16M16 16C16 10 10 6 4 8C8 8 12 12 16 16ZM16 16C16 10 22 6 28 8C24 8 20 12 16 16Z'
        stroke='#000'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
    <span
      style={{
        fontSize: '28px',
        fontWeight: 700,
        color: '#000',
        letterSpacing: '-0.5px',
      }}
    >
      framna
    </span>
  </div>
)

export default FramnaAnnouncementPopup
