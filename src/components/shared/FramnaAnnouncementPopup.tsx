import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const STORAGE_KEY = 'framna_announcement_shown_at'
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000
const SHOW_FROM_DATE = new Date('2026-03-18T00:00:00')

function shouldShowPopup(): boolean {
  const isStaging = process.env.GATSBY_ACTIVE_ENV === 'staging'
  const now = new Date()

  if (!isStaging && now < SHOW_FROM_DATE) {
    return false
  }

  try {
    const storedAt = localStorage.getItem(STORAGE_KEY)
    if (!storedAt) return true
    const lastShown = parseInt(storedAt, 10)
    if (isNaN(lastShown)) return true
    return Date.now() - lastShown > ONE_MONTH_MS
  } catch {
    return true
  }
}

function markPopupShown(): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // ignore
  }
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
`

const Modal = styled.div`
  display: flex;
  max-width: 640px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  position: relative;
`

const LeftPanel = styled.div`
  background: #5ee03a;
  flex: 0 0 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
`

const FramnaLogo = styled.img`
  max-width: 180px;
  width: 100%;
  height: auto;
`

const RightPanel = styled.div`
  flex: 1;
  padding: 48px 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: #0a0a0a;
  margin: 0;
`

const Body = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #0a0a0a;
  margin: 0;
`

const VisitButton = styled.a`
  display: inline-block;
  background: #0a0a0a;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 100px;
  text-decoration: none;
  align-self: flex-start;
  margin-top: 8px;

  &:hover {
    background: #333333;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0a;

  &:hover {
    opacity: 0.6;
  }
`

const FramnaAnnouncementPopup: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!shouldShowPopup()) return

    const show = () => {
      setVisible(true)
      markPopupShown()
    }

    if (document.readyState === 'complete') {
      const timer = setTimeout(show, 500)
      return () => clearTimeout(timer)
    } else {
      const onLoad = () => {
        const timer = setTimeout(show, 500)
        window.removeEventListener('load', onLoad)
        return () => clearTimeout(timer)
      }
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  if (!visible) return null

  return (
    <Overlay onClick={() => setVisible(false)}>
      <Modal onClick={e => e.stopPropagation()}>
        <LeftPanel>
          <FramnaLogo src='/images/why-us/timeline/framna.svg' alt='Framna logo' />
        </LeftPanel>
        <RightPanel>
          <Title>Bright Inventions is now Framna</Title>
          <Body>
            We partner with industry leaders (and those about to be) to create digital products that
            define markets, reshape industries, and drive meaningful growth.
          </Body>
          <VisitButton href='https://framna.com/' target='_blank' rel='noopener noreferrer'>
            Visit Framna
          </VisitButton>
        </RightPanel>
        <CloseButton onClick={() => setVisible(false)} aria-label='Close'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path
              d='M15 5L5 15M5 5l10 10'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </CloseButton>
      </Modal>
    </Overlay>
  )
}

export default FramnaAnnouncementPopup
