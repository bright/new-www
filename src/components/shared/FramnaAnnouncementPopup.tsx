import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import variables, { roundedCorners } from '../../styles/variables'

if (typeof window !== 'undefined') {
  Modal.setAppElement('#___gatsby')
}

const SESSION_KEY = 'framna_announcement_shown'

// Production: only show from 18.03.2026
// Staging (GATSBY_ACTIVE_ENV=staging): show from today
const SHOW_FROM_DATE = process.env.GATSBY_ACTIVE_ENV === 'staging'
  ? new Date(0) // always show on staging
  : new Date('2026-03-18T00:00:00')

const overlayStyles: React.CSSProperties = {
  zIndex: 1002,
  background: 'rgba(10, 10, 10, 0.65)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const PopupContainer = styled.div`
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  max-width: 700px;
  width: 100%;
  min-height: 320px;
  position: relative;
  background: #fff;

  @media ${variables.device.mobile} {
    flex-direction: column;
    max-width: 90vw;
  }
`

const LeftPanel = styled.div`
  background: #5bce4a;
  flex: 0 0 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${variables.pxToRem(40)};

  @media ${variables.device.mobile} {
    padding: ${variables.pxToRem(32)} ${variables.pxToRem(24)};
    flex: 0 0 auto;
  }
`

const RightPanel = styled.div`
  flex: 1;
  padding: ${variables.pxToRem(48)} ${variables.pxToRem(40)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  @media ${variables.device.mobile} {
    padding: ${variables.pxToRem(32)} ${variables.pxToRem(24)} ${variables.pxToRem(40)};
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: ${variables.pxToRem(16)};
  right: ${variables.pxToRem(16)};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${variables.pxToRem(8)};
  line-height: 0;
  color: ${variables.color.text};

  &:hover {
    opacity: 0.6;
  }
`

const PopupTitle = styled.h2`
  font-family: ${variables.font.montserrat};
  font-size: ${variables.pxToRem(28)};
  font-weight: 800;
  line-height: 1.2;
  color: ${variables.color.text};
  margin: 0 0 ${variables.pxToRem(16)};

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(22)};
  }
`

const PopupText = styled.p`
  font-family: ${variables.font.lato};
  font-size: ${variables.pxToRem(16)};
  line-height: 1.6;
  color: ${variables.color.text};
  margin: 0 0 ${variables.pxToRem(28)};
`

const VisitButton = styled.a`
  display: inline-block;
  background: ${variables.color.text};
  color: ${variables.color.white};
  font-family: ${variables.font.montserrat};
  font-size: ${variables.pxToRem(16)};
  font-weight: 600;
  padding: ${variables.pxToRem(14)} ${variables.pxToRem(28)};
  border-radius: ${roundedCorners};
  text-decoration: none;
  transition: opacity 0.2s ease;
  align-self: flex-start;

  &:hover {
    opacity: 0.8;
  }
`

const FramnaLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${variables.pxToRem(10)};
`

const FramnaLogoText = styled.span`
  font-family: ${variables.font.montserrat};
  font-size: ${variables.pxToRem(32)};
  font-weight: 700;
  color: ${variables.color.text};
  letter-spacing: -0.5px;

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(24)};
  }
`

function FramnaIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 4C18 4 10 10 10 20C10 25.523 13.477 30 18 30C22.523 30 26 25.523 26 20C26 10 18 4 18 4Z"
        fill={variables.color.text}
        opacity="0.15"
      />
      <path
        d="M18 8C18 8 12 13 12 21C12 25.418 14.686 29 18 29"
        stroke={variables.color.text}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M18 14C18 14 22 17 22 22"
        stroke={variables.color.text}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="30" r="2" fill={variables.color.text} />
    </svg>
  )
}

export function FramnaAnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const now = new Date()
    if (now < SHOW_FROM_DATE) return
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY)) return

    // Show after page fully loads
    const onLoad = () => {
      setTimeout(() => {
        setIsOpen(true)
      }, 500)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  function handleClose() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{ overlay: overlayStyles, content: { inset: 'auto', padding: 0, border: 'none', background: 'transparent', borderRadius: 0, maxWidth: '700px', width: '90%', margin: 'auto' } }}
      contentLabel="Bright Inventions is now Framna"
    >
      <PopupContainer>
        <LeftPanel>
          <FramnaLogoWrapper>
            <FramnaIcon />
            <FramnaLogoText>framna</FramnaLogoText>
          </FramnaLogoWrapper>
        </LeftPanel>
        <RightPanel>
          <CloseButton onClick={handleClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </CloseButton>
          <PopupTitle>Bright Inventions is now Framna</PopupTitle>
          <PopupText>
            We partner with industry leaders (and those about to be) to create digital products that define markets,
            reshape industries, and drive meaningful growth.
          </PopupText>
          <VisitButton href="https://framna.com/" target="_blank" rel="noopener noreferrer">
            Visit Framna
          </VisitButton>
        </RightPanel>
      </PopupContainer>
    </Modal>
  )
}
