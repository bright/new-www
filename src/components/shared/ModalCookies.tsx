import React, { ChangeEvent, useState } from 'react'
import Modal from 'react-modal'
import { FlexWrapper } from '.'
import { CustomSectionTitle, SectionTitle, TextRegular } from './index.styled'
import styled from 'styled-components'
import { clampBuilder } from '../../helpers/clampBuilder'
import variables from '../../styles/variables'
import { CheckboxSwitch } from '../forms/fields/checkbox-switch'
import { useWindowSize } from '../utils/use-windowsize'

import './ModalCookies.scss'

Modal.setAppElement(`#___gatsby`)

const CookiesTextRegular = styled(TextRegular)`
  color: #f9f9f9;
  line-height: 24px;
  @media ${variables.device.tablet} {
    max-width: 90%;
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
  top: 40px;
  right: 40px;
  border: none;
  background: none;
  color: ${variables.color.white};
  cursor: pointer;
  font-size: ${variables.pxToRem(24)};
  line-height: ${variables.pxToRem(24)};
`

const customStyles = {
  overlay: {
    zIndex: '1001',
    background: 'rgba(10,10,10,.7)',
  },
  content: {
    borderRadius: ' 0',

    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // transform: 'translate(-50%, -50%)',
    paddingTop: `${clampBuilder(360, 1920, 63, 113)}`,
    paddingBottom: `${clampBuilder(992, 1920, 63, 113)}`,
    paddingLeft: `${clampBuilder(360, 1920, 19, 76)}`,
    paddingRight: `${clampBuilder(360, 1920, 19, 76)}`,
    background: `#0a0a0a`,
    border: `2px solid #f9f9f9`,
    maxHeight: `100%`,
  },
}

function ModalCookies(props: {
  modalIsOpen: boolean
  closeModal: React.MouseEventHandler<HTMLButtonElement> | undefined
  onChanged?: (event: ChangeEvent) => void
  checkedAnalistic?: boolean
  checkedMarketing?: boolean
  onAccept: (isAllowSelected?: boolean) => void
}) {
  const { width } = useWindowSize()
  const breakpoint = 992

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        className='modal-cookies'
      >
        <FlexWrapper tabletContent='space-between' desktopDirection='column' style={{ height: '100%' }}>
          <FlexWrapper desktopDirection='column'>
            <CloseButton onClick={props.closeModal}>X</CloseButton>
            <CustomSectionTitle style={{ color: '#fff', margin: '0 0 24px', textAlign: 'left' }}>
              customize cookies{' '}
            </CustomSectionTitle>
            <CookiesTextRegular style={{ margin: '0 0 24px' }}>
              You can decide which cookies you allow us to use. You can change your settings at any time.{' '}
            </CookiesTextRegular>

            <FlexWrapper desktopDirection='column' desktopGap='24px'>
              {width <= breakpoint && (
                <FlexWrapper tabletDirection='column'>
                  <FlexWrapper tabletDirection='column' tabletContent='space-between'>
                    <div>
                      <FlexWrapper tabletDirection='column' tabletGap='24px'>
                        <FlexWrapper tabletItems='baseline' tabletContent='space-between'>
                          <CookiesSectionTitle>analytics cookies</CookiesSectionTitle>
                          <CheckboxSwitch
                            name='anlystics'
                            onChange={props.onChanged}
                            checked={props.checkedAnalistic}
                          />
                        </FlexWrapper>

                        <CookiesTextRegular>
                          These cookies help us monitor site traffic and analytics, as well as user experience. They
                          enable us to optimize the website according to your needs.
                        </CookiesTextRegular>
                      </FlexWrapper>

                      <FlexWrapper tabletDirection='column' tabletGap='24px'>
                        <FlexWrapper tabletItems='baseline' tabletContent='space-between'>
                          <CookiesSectionTitle>marketing cookies</CookiesSectionTitle>
                          <CheckboxSwitch
                            name='marketing'
                            onChange={props.onChanged}
                            checked={props.checkedMarketing}
                          />
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
              )}
              {width > breakpoint && (
                <FlexWrapper desktopDirection='column' desktopGap='24px'>
                  <CookiesSectionTitle>analytics cookies</CookiesSectionTitle>
                  <FlexWrapper desktopGap='130px' desktopItems='baseline' tabletXLGap='65px'>
                    <CookiesTextRegular>
                      These cookies help us monitor site traffic and analytics, as well as user experience. They enable
                      us to optimize the website according to your needs.
                    </CookiesTextRegular>
                    <CheckboxSwitch name='anlystics' onChange={props.onChanged} checked={props.checkedAnalistic} />
                  </FlexWrapper>
                  <CookiesSectionTitle>marketing cookies</CookiesSectionTitle>
                  <FlexWrapper desktopGap='130px' desktopItems='baseline' tabletXLGap='65px'>
                    <CookiesTextRegular>
                      These cookies allow us to tailor and measure the effectiveness of our advertising by tracking
                      users' activity on our page. These cookies may be capable of understanding your interests, across
                      other sites and building up a profile that is used for remarketing purposes. If you do not allow
                      these cookies you may experience less tailored advertisements.
                    </CookiesTextRegular>
                    <CheckboxSwitch name='marketing' onChange={props.onChanged} checked={props.checkedMarketing} />
                  </FlexWrapper>
                </FlexWrapper>
              )}
            </FlexWrapper>
          </FlexWrapper>
          <FlexWrapper
            desktopContent='flex-end'
            desktopGap='25px'
            style={{ marginTop: '52px' }}
            tabletDirection='column-reverse'
          >
            <SelectedButton onClick={() => props.onAccept(true)}>allow selected</SelectedButton>

            <AllowAllButton onClick={() => props.onAccept()}>allow all</AllowAllButton>
          </FlexWrapper>
        </FlexWrapper>
      </Modal>
    </div>
  )
}

export default ModalCookies
