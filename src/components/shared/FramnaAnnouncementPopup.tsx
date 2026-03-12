import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import variables, { roundedCorners } from '../../styles/variables'

const STORAGE_KEY = 'framna_announcement_shown'

const isStaging = process.env.GATSBY_ACTIVE_ENV === 'staging'

const SHOW_FROM_DATE = new Date('2026-03-18T00:00:00')

function shouldShowPopup(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return false
  } catch {
    return false
  }
  const now = new Date()
  if (isStaging) return true
  return now >= SHOW_FROM_DATE
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const Modal = styled.div`
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
  max-width: 640px;
  width: 100%;
  background: #fff;
  position: relative;

  @media ${variables.device.mobile} {
    flex-direction: column;
  }
`

const GreenPanel = styled.div`
  background: #4bce57;
  flex: 0 0 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;

  @media ${variables.device.mobile} {
    padding: 2rem 1.5rem;
    flex: none;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LogoIcon = styled.span`
  font-size: 1.75rem;
  line-height: 1;
`

const LogoText = styled.span`
  font-family: ${variables.font.montserrat};
  font-size: 1.875rem;
  font-weight: 700;
  color: #0a0a0a;
  letter-spacing: -0.02em;
`

const ContentPanel = styled.div`
  flex: 1;
  padding: 2.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;

  @media ${variables.device.mobile} {
    padding: 1.5rem 1.5rem 1.5rem;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 0.875rem;
  right: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  color: #0a0a0a;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.6;
  }
`

const Title = styled.h2`
  font-family: ${variables.font.montserrat};
  font-size: 1.75rem;
  font-weight: 700;
  color: #0a0a0a;
  margin: 0 0 1rem;
  line-height: 1.2;

  @media ${variables.device.mobile} {
    font-size: 1.375rem;
  }
`

const Body = styled.p`
  font-family: ${variables.font.lato};
  font-size: 1rem;
  color: #0a0a0a;
  line-height: 1.6;
  margin: 0 0 1.75rem;
  flex: 1;
`

const VisitButton = styled.a`
  display: inline-block;
  background: #0a0a0a;
  color: #fff;
  font-family: ${variables.font.montserrat};
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.75rem;
  border-radius: ${roundedCorners};
  text-decoration: none;
  align-self: flex-start;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

export const FramnaAnnouncementPopup: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!shouldShowPopup()) {
      return undefined
    }

    const show = () => {
      setVisible(true)
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch (_e) {
        // ignore
      }
    }

    let timerId: number | undefined

    if (document.readyState === 'complete') {
      timerId = setTimeout(show, 500)
    } else {
      const onLoad = () => {
        timerId = setTimeout(show, 500)
        window.removeEventListener('load', onLoad)
      }
      window.addEventListener('load', onLoad)
    }

    return () => clearTimeout(timerId)
  }, [])

  if (!visible) return null

  const handleClose = () => setVisible(false)

  return (
    <Overlay onClick={handleClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={handleClose} aria-label='Close announcement'>
          ✕
        </CloseButton>
        <GreenPanel>
          <LogoWrapper>
            <LogoIcon>ψ</LogoIcon>
            <LogoText>framna</LogoText>
          </LogoWrapper>
        </GreenPanel>
        <ContentPanel>
          <Title>Bright Inventions is now Framna</Title>
          <Body>
            We partner with industry leaders (and those about to be) to create digital products that define markets,
            reshape industries, and drive meaningful growth.
          </Body>
          <VisitButton href='https://framna.com/' target='_blank' rel='noopener noreferrer'>
            Visit Framna
          </VisitButton>
        </ContentPanel>
      </Modal>
    </Overlay>
  )
}
