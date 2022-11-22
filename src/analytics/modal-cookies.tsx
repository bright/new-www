import React, { useState } from 'react'
import Modal from 'react-modal'
import { FlexWrapper } from '../components/shared'
import { CustomSectionTitle, SectionTitle, TextRegular } from '../components/shared/index.styled'
import styled from 'styled-components'

import variables from '../styles/variables'
import { CheckboxSwitch } from '../components/forms/fields/checkbox-switch'

import './modal-cookies.scss'
import { loadConsentsStateOrDefault, onAllowAll, onAllowSelected } from './local-storage-constants'

Modal.setAppElement(`#___gatsby`)

const CookiesTextRegular = styled(TextRegular)`
  color: #f9f9f9;
  line-height: 24px;
  max-width: 90%;
  @media ${variables.device.laptop} {
    max-width: 79%;
  }
  @media ${variables.device.tabletXL} {
    max-width: 89%;
  }
  @media ${variables.device.tablet} {
    max-width: 90%;
  }
  @media ${variables.device.mobile} {
    max-width: 100%;
    line-height: 19px;
  }
`
const CookiesSectionTitle = styled(SectionTitle)`
  color: #fff;
  margin: 0;
  text-align: left;
  line-height: 24px;
  font-weight: 800;
  @media ${variables.device.tablet} {
    max-width: 90%;
  }
`
const SelectedButton = styled.button`
  font-family: ${variables.font.customtext.monserat};
  font-size: ${variables.pxToRem(19)};
  text-decoration: underline;
  cursor: pointer;
  border: none;
  background: ${variables.color.text2};
  color: ${variables.color.white};
  @media ${variables.device.tablet} {
    text-decoration: none;
  }
`
const AllowAllButton = styled.button`
  font-family: ${variables.font.customtext.monserat};
  font-size: ${variables.pxToRem(20)};
  line-height: ${variables.pxToRem(24)};
  font-weight: bold;
  cursor: pointer;
  border: 1px solid ${variables.color.primary};
  text-transform: lowercase;
  letter-spacing: 0px;
  color: #0a0a0a;
  padding: ${variables.pxToRem(6)} ${variables.pxToRem(67)};
  background: ${variables.color.primary};
  transition: all ease-out 0.3s;

  &:hover {
    background: ${variables.color.text2};
    color: ${variables.color.white};
    border: 1px solid ${variables.color.white};
  }
`
const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  top: 40px;
  right: 40px;

  @media ${variables.device.mobile} {
    top: 19px;
    right: 13px;
  }
`

const customStyles = {
  overlay: {
    zIndex: '1001',
    background: 'rgba(10,10,10,.7)',
  },
}

const SignX = styled.div`
  width: 50px;
  height: 50px;
  background-color: transparent;
  position: relative;

  &::after,
  ::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: #f9f9f9;
    border-radius: 2px;
    top: 11px;
  }

  &:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
    right: 2px;
  }

  &:before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    left: 25px;
  }
`
const ButtonConsentModalFlexWrapper = styled(FlexWrapper)`
  margin-top: ${variables.pxToRem(52)};
  @media ${variables.device.mobile} {
    position: absolute;
    bottom: 0;
    left: 18px;
    right: 18px;
    padding-bottom: 15px;
  }
`

export function ModalCookiesPresentation(props: {
  modalIsOpen: boolean
  closeModal: React.MouseEventHandler<HTMLButtonElement> | undefined
  onChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void
  checkedAnalistic?: boolean
  checkedMarketing?: boolean
  onAccept: (isAllowSelected?: boolean) => void
  allowAll: () => void
}) {
  const handleAllowAll = () => {
    props.allowAll()
    setTimeout(() => {
      props.onAccept()
    }, 1000)
  }

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        className='modal-cookies'
      >
        <FlexWrapper tabletContent='space-between' desktopDirection='column'>
          <FlexWrapper desktopDirection='column'>
            <CloseButton onClick={props.closeModal}>
              <SignX></SignX>
            </CloseButton>
            <CustomSectionTitle style={{ color: '#fff', margin: '0 0 24px', textAlign: 'left' }}>
              customize cookies{' '}
            </CustomSectionTitle>
            <CookiesTextRegular>
              You can decide which cookies you allow us to use. You can change your settings at any time.{' '}
            </CookiesTextRegular>

            <FlexWrapper desktopDirection='column' desktopGap='24px'>
              <FlexWrapper desktopDirection='column'>
                <FlexWrapper desktopDirection='column' desktopContent='space-between'>
                  <div>
                    <FlexWrapper desktopDirection='column' desktopGap='24px'>
                      <FlexWrapper desktopItems='baseline' desktopContent='space-between'>
                        <CookiesSectionTitle>analytics cookies</CookiesSectionTitle>
                        <CheckboxSwitch name='anlystics' onChange={props.onChanged} checked={props.checkedAnalistic} />
                      </FlexWrapper>

                      <CookiesTextRegular>
                        These cookies help us monitor site traffic and analytics, as well as user experience. They
                        enable us to optimize the website according to your needs.
                      </CookiesTextRegular>
                    </FlexWrapper>

                    <FlexWrapper desktopDirection='column' desktopGap='24px'>
                      <FlexWrapper desktopItems='baseline' desktopContent='space-between'>
                        <CookiesSectionTitle>marketing cookies</CookiesSectionTitle>
                        <CheckboxSwitch name='marketing' onChange={props.onChanged} checked={props.checkedMarketing} />
                      </FlexWrapper>

                      <CookiesTextRegular>
                        These cookies allow us to tailor and measure the effectiveness of our advertising by tracking
                        users' activity on our page. These cookies may be capable of understanding your interests,
                        across other sites and building up a profile that is used for remarketing purposes. If you do
                        not allow these cookies you may experience less tailored advertisements.
                      </CookiesTextRegular>
                    </FlexWrapper>
                  </div>
                </FlexWrapper>
              </FlexWrapper>
            </FlexWrapper>
          </FlexWrapper>
          <ButtonConsentModalFlexWrapper desktopContent='flex-end' desktopGap='25px' tabletDirection='column-reverse'>
            <SelectedButton onClick={() => props.onAccept(true)}>confirm choices</SelectedButton>

            <AllowAllButton onClick={handleAllowAll}>allow all</AllowAllButton>
          </ButtonConsentModalFlexWrapper>
        </FlexWrapper>
      </Modal>
    </div>
  )
}

export function ModalCookies({ modalIsOpen, closeModal }: { modalIsOpen: boolean; closeModal: (isOpen: boolean) => void }) {
  const [consents, setConsents] = useState(loadConsentsStateOrDefault)

  const handleAllowAll = () => {
    setConsents({
      marketing: true,
      anlystics: true,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      // TODO: 2 separate callbacks would be much better!
      setConsents({ ...consents, [e.target.name]: e.target.checked })
    }
  }

  return (
    <ModalCookiesPresentation
      allowAll={handleAllowAll}
      onChanged={handleChange}
      modalIsOpen={modalIsOpen}
      checkedAnalistic={consents.anlystics}
      checkedMarketing={consents.marketing}
      closeModal={() => closeModal(false)}
      onAccept={isAllowSelected => {
        if (isAllowSelected) {
          onAllowSelected(consents.marketing, consents.anlystics)
        } else {
          onAllowAll()
        }
        closeModal(false)
      }}
    />
  )
}
