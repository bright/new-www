import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import variables from '../../styles/variables'

Modal.setAppElement(`#___gatsby`)

const customStyles = {
  overlay: {
    zIndex: '1002',
    background: 'rgba(10, 10, 10, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative' as const,
    inset: 'auto',
    border: 'none',
    background: 'transparent',
    overflow: 'visible',
    borderRadius: '0',
    outline: 'none',
    padding: '0',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
}

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  position: relative;

  @media ${variables.device.tablet} {
    flex-direction: column;
    max-width: 500px;
  }

  @media ${variables.device.mobile} {
    max-width: 95vw;
    border-radius: 12px;
  }
`

const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 10;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  @media ${variables.device.mobile} {
    top: 15px;
    right: 15px;
  }
`

const CloseIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: #000;
    top: 50%;
    left: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

const LogoSection = styled.div`
  background: linear-gradient(135deg, #7ed957 0%, #4cb944 100%);
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 400px;

  @media ${variables.device.tablet} {
    padding: 50px 30px;
    min-height: 250px;
  }

  @media ${variables.device.mobile} {
    padding: 40px 20px;
    min-height: 200px;
  }
`

const FramnaLogo = styled.div`
  font-family: Inter, sans-serif;
  font-size: 64px;
  font-weight: 700;
  color: #000;
  display: flex;
  align-items: center;
  gap: 12px;

  @media ${variables.device.tablet} {
    font-size: 48px;
    gap: 10px;
  }

  @media ${variables.device.mobile} {
    font-size: 36px;
    gap: 8px;
  }
`

const LogoIcon = styled.svg`
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  @media ${variables.device.tablet} {
    width: 40px;
    height: 40px;
  }

  @media ${variables.device.mobile} {
    width: 30px;
    height: 30px;
  }
`

const ContentSection = styled.div`
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;

  @media ${variables.device.tablet} {
    padding: 40px 30px;
    gap: 20px;
  }

  @media ${variables.device.mobile} {
    padding: 30px 20px;
    gap: 16px;
  }
`

const Title = styled.h1`
  font-family: Inter, sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: #000;

  @media ${variables.device.tablet} {
    font-size: 28px;
  }

  @media ${variables.device.mobile} {
    font-size: 24px;
  }
`

const Description = styled.h2`
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  color: #000;

  strong {
    font-weight: 700;
  }

  @media ${variables.device.tablet} {
    font-size: 18px;
  }

  @media ${variables.device.mobile} {
    font-size: 16px;
  }
`

const VisitButton = styled.a`
  display: inline-block;
  background: #000;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 50px;
  text-align: center;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: #333;
    color: #fff;
    transform: translateY(-2px);
  }

  @media ${variables.device.mobile} {
    width: 100%;
  }
`

const ModalLayout = styled.div`
  display: flex;
  flex-direction: row;

  @media ${variables.device.tablet} {
    flex-direction: column;
  }
`

export interface FramnaAnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
}

export const FramnaAnnouncementModal: React.FC<FramnaAnnouncementModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel='Framna Announcement'>
      <ModalContent>
        <CloseButton onClick={onClose} aria-label='Close'>
          <CloseIcon />
        </CloseButton>
        <ModalLayout>
          <LogoSection>
            <FramnaLogo>
              <LogoIcon viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M25 5C25 5 15 5 15 15C15 25 25 25 25 25C25 25 25 15 35 15C45 15 45 25 35 25C25 25 25 35 25 45'
                  stroke='#000'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                />
              </LogoIcon>
              framna
            </FramnaLogo>
          </LogoSection>
          <ContentSection>
            <Title>Bright Inventions is now Framna</Title>
            <Description>
              Bontouch, Shape, Move and Bright Inventions have come together as <strong>Framna</strong> — the people
              behind the world's favorite digital products.
            </Description>
            <VisitButton href='https://framna.com' target='_blank' rel='noopener noreferrer'>
              Visit Framna
            </VisitButton>
          </ContentSection>
        </ModalLayout>
      </ModalContent>
    </Modal>
  )
}
