import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import { routeLinks } from '../config/routing'
import { TextRegular } from '../components/shared/index.styled'
import styled from 'styled-components'
import variables from '../styles/variables'
import { ModalCookies } from './modal-cookies'
import { onAllowAll } from './local-storage-constants'
import { hasUserDecidedOnAnalyticsConsentCookieName } from './has-user-decided-on-analytics-consent-cookie-name'
import { ContextualCookieConsent, useCookieConsentContext } from './contextual-cookie-consent'
import { VISIBILITY_OPTIONS } from 'react-cookie-consent/src/models/constants/visibilityOptions'

// using env variables here would invalidate webpack cache hashes it seems
// const isEagerCookieConsentEnabled = process.env.COOKIE_CONSENT_EAGER_RENDER_ENABLED === 'true'

const SectionNotice = styled.section`
  & .wrapper-button {
    display: flex;
    width: 100%;
  }

  & .overlay {
    background: rgba(10, 10, 10, 0.43);
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  & .cookies-wrapper {
    background: ${variables.color.text2};
    padding: ${variables.pxToRem(61)} ${variables.pxToRem(80)};
    bottom: 0px;
    align-items: baseline;

    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    left: 0px;
    position: fixed;
    width: 100%;
    z-index: 1000;
  }

  & #confirm-button {
    margin-left: 160px;
    font-family: ${variables.font.customtext.monserat};
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(24)};
    font-weight: bold;
    cursor: pointer;
    border: 1px solid ${variables.color.primary};
    text-transform: lowercase;
    letter-spacing: 0px;
    color: #0a0a0a;
    padding: ${variables.pxToRem(17)} ${variables.pxToRem(122)};
    background: ${variables.color.primary};
    transition: all ease-out 0.3s;

    &:hover {
      background: ${variables.color.text2};
      color: ${variables.color.white};
      border: 1px solid ${variables.color.white};
    }
  }

  @media ${variables.device.laptop} {
    & .cookies-wrapper {
      padding: ${variables.pxToRem(49)} ${variables.pxToRem(80)};
    }
  }
  @media ${variables.device.tabletXL} {
    & .cookies-wrapper {
      padding: ${variables.pxToRem(23)} ${variables.pxToRem(80)};
    }
  }
  @media ${variables.device.tablet} {
    & .cookies-wrapper {
      padding: ${variables.pxToRem(40)} ${variables.pxToRem(36)} ${variables.pxToRem(103)};
    }

    & #confirm-button {
      margin-left: 0;
      width: 100%;
      padding: ${variables.pxToRem(17)} 0;
    }
  }

  @media ${variables.device.mobile} {
    & .cookies-wrapper {
      padding: ${variables.pxToRem(18)} ${variables.pxToRem(18)} ${variables.pxToRem(103)};
    }
  }
`

const CookieText = styled(TextRegular)`
  line-height: ${variables.pxToRem(24)};
  color: ${variables.color.white};
  padding-bottom: ${variables.pxToRem(32)};
  @media ${variables.device.tabletXL} {
    padding-bottom: ${variables.pxToRem(39)};
  }
  @media ${variables.device.tablet} {
    padding-bottom: ${variables.pxToRem(56)};
  }
  @media ${variables.device.tablet} {
    padding-bottom: ${variables.pxToRem(40)};
  }
`
const CustomizeButton = styled.button`
  font-family: ${variables.font.customtext.monserat};
  font-size: ${variables.pxToRem(16)};
  text-decoration: underline;
  cursor: pointer;
  border: none;
  background: ${variables.color.text2};
  color: ${variables.color.white};
  transform: translateY(42px);
  padding: 0;
  margin: 0;
  @media ${variables.device.tablet} {
    position: absolute;
    right: 50%;
    left: auto;
    transform: translate(50%, 0);
    bottom: 40px;
    text-decoration: none;
  }
  @media ${variables.device.mobile} {
    bottom: 48px;
  }
`

type VisibilityOptions = typeof VISIBILITY_OPTIONS[keyof typeof VISIBILITY_OPTIONS]

function CookiesNotice() {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const {setVisibleByDefault} = useCookieConsentContext()
  const [cookieConsentVisible, setCookieConsentVisible] = useState<VisibilityOptions>(
    VISIBILITY_OPTIONS.BY_COOKIE_VALUE
  )

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setVisibleByDefault(false)
    setIsOpen(false)
    setCookieConsentVisible(VISIBILITY_OPTIONS.HIDDEN)
  }

  function onAccept(){
    setVisibleByDefault(false)
    setCookieConsentVisible(VISIBILITY_OPTIONS.HIDDEN)
    onAllowAll()
  }

  return (
    <SectionNotice suppressHydrationWarning={true}>
      <ContextualCookieConsent
        location='bottom'
        buttonText='allow cookies'
        cookieName={hasUserDecidedOnAnalyticsConsentCookieName}
        visible={cookieConsentVisible}
        disableStyles={true}
        disableButtonStyles={true}
        buttonId='confirm-button'
        buttonWrapperClasses={'wrapper-button'}
        containerClasses={'cookies-wrapper'}
        onAccept={onAccept}
      >
        <div>
          <div className='overlay'></div>
          <CookieText>
            We use cookies or other technologies. Change settings via “customize”. {' '}
            <Link to={routeLinks.privacyPolicy} style={{ color: '#fff', textDecoration: 'underline' }}>
              Read Privacy Policy
            </Link>{' '}
            .
          </CookieText>
          <CustomizeButton onClick={openModal}>customize</CustomizeButton>
          <ModalCookies modalIsOpen={modalIsOpen} closeModal={closeModal} />
        </div>
      </ContextualCookieConsent>
    </SectionNotice>
  )
}

export default CookiesNotice
