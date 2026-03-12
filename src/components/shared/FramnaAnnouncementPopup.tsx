import React, { useEffect, useState } from 'react'

const SESSION_KEY = 'framna_announcement_shown'

function shouldShowPopup(): boolean {
  if (typeof window === 'undefined') return false

  const alreadyShown = window.sessionStorage.getItem(SESSION_KEY)
  if (alreadyShown) return false

  const isStaging = process.env.GATSBY_ACTIVE_ENV === 'staging'
  if (isStaging) return true

  const showFrom = new Date('2026-03-18T00:00:00')
  return new Date() >= showFrom
}

const FramnaAnnouncementPopup: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = () => {
      if (shouldShowPopup()) {
        setVisible(true)
        window.sessionStorage.setItem(SESSION_KEY, '1')
      }
    }

    if (document.readyState === 'complete') {
      const timer = setTimeout(show, 500)
      return () => clearTimeout(timer)
    } else {
      const onLoad = () => {
        const timer = setTimeout(show, 500)
        window.addEventListener('unload', () => clearTimeout(timer), { once: true })
      }
      window.addEventListener('load', onLoad, { once: true })
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  if (!visible) return null

  const close = () => setVisible(false)

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
        padding: '1rem',
      }}
      onClick={close}
    >
      <div
        style={{
          display: 'flex',
          borderRadius: '1rem',
          overflow: 'hidden',
          maxWidth: '56rem',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left green panel */}
        <div
          style={{
            backgroundColor: '#5EE03A',
            flex: '0 0 45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem',
            minHeight: '22rem',
          }}
        >
          <img
            src='/images/why-us/timeline/framna.svg'
            alt='framna'
            style={{ width: '100%', maxWidth: '14rem' }}
          />
        </div>

        {/* Right white panel */}
        <div
          style={{
            backgroundColor: '#ffffff',
            flex: 1,
            padding: '3rem 2.5rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label='Close'
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              lineHeight: 1,
              fontSize: '1.5rem',
              color: '#000',
            }}
          >
            ✕
          </button>

          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              color: '#000',
            }}
          >
            Bright Inventions is now Framna
          </h2>

          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#333',
              marginBottom: '2rem',
            }}
          >
            We partner with industry leaders (and those about to be) to create digital products that
            define markets, reshape industries, and drive meaningful growth.
          </p>

          <div>
            <a
              href='https://framna.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                display: 'inline-block',
                backgroundColor: '#000',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0.875rem 2rem',
                borderRadius: '2rem',
                textDecoration: 'none',
              }}
            >
              Visit Framna
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FramnaAnnouncementPopup
