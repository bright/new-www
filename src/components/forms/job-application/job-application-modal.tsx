import React from 'react'
import styled from 'styled-components'
import variables from '../../../styles/variables'
import { CustomSectionTitle } from '../../shared/index.styled'
import BackButton from '../../subcomponents/BackButton'

const ModalCard = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 1.5rem;
  text-align: center;
  color: ${variables.color.text};
  overflow-x: hidden;
  margin: 0;

  .modal-title {
    margin: 0;
    padding-bottom: 2rem;
    font-size: 2rem;
    line-height: 2.75rem;
  }

  & > a {
    font-size: ${variables.font.customtext.sizeButton};
    font-weight: 900;
    & > span:last-of-type {
      padding-left: 1rem;
    }
  }
`
const ModalBody = styled.section`
  flex: 0 0;
  padding: 0 0 4rem;
  overflow: unset;
`
const ModalWrapper = styled.div`
  background: #fff;
`
const ModalHeader = styled.div`
  margin-left: auto;
  padding: 1.5rem 1.125rem;

  button {
    background: transparent;
    border: 1px solid ${variables.color.primary};
    font-weight: 700;
    font-size: 1.5rem;
    cursor: pointer;
  }
`

export interface ModalProps {
  title?: string
  link?: string
  linkLabel?: string
  closeModal?: () => void
  modalState?: boolean
}

export const JobApplicationModal: React.FC<ModalProps> = props => {
  const { modalState, closeModal, title, link, linkLabel, children } = props

  if (!modalState) {
    return null
  }

  return (
    <ModalWrapper className='modal is-active'>
      <ModalHeader>
        <button onClick={closeModal}>X</button>
      </ModalHeader>
      <ModalCard className='modal-card'>
        <CustomSectionTitle className='modal-title'>{title}</CustomSectionTitle>
        <ModalBody className='modal-card-body'>
          <div className='content'>{children}</div>
        </ModalBody>
        <BackButton url={link!} label={linkLabel!} arrowColor={'orange'} className={''} onClick={closeModal} />
      </ModalCard>
    </ModalWrapper>
  )
}
