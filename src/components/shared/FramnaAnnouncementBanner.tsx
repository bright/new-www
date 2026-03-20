import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'

const STORAGE_KEY = 'framna_banner_dismissed_at'
const BANNER_HEIGHT = '44px'

function isBannerDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
}

function dismissBanner(): void {
  try {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
  } catch {
    // ignore storage errors
  }
}

const BannerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1002;
  background-color: #1bc866;
  height: ${BANNER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${variables.pxToRem(48)};

  @media ${variables.device.mobile} {
    padding: 0 ${variables.pxToRem(40)};
    height: auto;
    min-height: ${BANNER_HEIGHT};
    flex-wrap: wrap;
    padding-top: ${variables.pxToRem(8)};
    padding-bottom: ${variables.pxToRem(8)};
  }
`

const BannerText = styled.span`
  font-family: ${variables.font.montserrat};
  font-size: ${variables.pxToRem(14)};
  font-weight: 600;
  color: #0a0a0a;
  letter-spacing: 0.01em;

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(13)};
    text-align: center;
  }
`

const BannerLink = styled.a`
  font-family: ${variables.font.montserrat};
  font-size: ${variables.pxToRem(14)};
  font-weight: 800;
  color: #0a0a0a;
  text-decoration: underline;
  margin-left: ${variables.pxToRem(6)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(13)};
  }
`

const CloseButton = styled.button`
  position: absolute;
  right: ${variables.pxToRem(16)};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: ${variables.pxToRem(4)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0a;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  @media ${variables.device.mobile} {
    top: ${variables.pxToRem(8)};
    transform: none;
  }
`

const CloseIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 4L4 12M4 4L12 12' stroke='#0a0a0a' strokeWidth='2' strokeLinecap='round' />
  </svg>
)

export const FramnaAnnouncementBanner: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isBannerDismissed()) {
      setVisible(true)
      document.documentElement.style.setProperty('--announcement-height', BANNER_HEIGHT)
    }
    return () => {
      document.documentElement.style.setProperty('--announcement-height', '0px')
    }
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    dismissBanner()
    document.documentElement.style.setProperty('--announcement-height', '0px')
  }

  if (!visible) return null

  return (
    <BannerWrapper>
      <BannerText>Bright Inventions is now Framna —</BannerText>
      <BannerLink href='https://framna.com/' target='_blank' rel='noopener noreferrer'>
        visit framna.com
      </BannerLink>
      <CloseButton onClick={handleDismiss} aria-label='Dismiss announcement'>
        <CloseIcon />
      </CloseButton>
    </BannerWrapper>
  )
}
