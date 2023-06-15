import CookieConsent from 'react-cookie-consent'
import { CookieConsentProps } from 'react-cookie-consent/dist/CookieConsent.props'
import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import { hasUserDecidedOnConsent } from './local-storage-constants'

const CookieConsentContext = createContext({
  visibleByDefault: false,
  setVisibleByDefault(visible: boolean) {},
})

export const CookieConsentContextWrapper: React.FC<PropsWithChildren<{ visibleByDefault?: boolean }>> = function ({
  children,
  visibleByDefault,
}) {
  const [visible, setVisible] = useState(() =>
    typeof visibleByDefault == 'boolean' ? visibleByDefault : !hasUserDecidedOnConsent()
  )
  return (
    <CookieConsentContext.Provider value={{ visibleByDefault: visible, setVisibleByDefault: setVisible }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

class VisibleCookieConsent extends CookieConsent {
  constructor(props: CookieConsentProps) {
    super(props)
    this.state = {
      ...this.state,
      visible: true,
    }
  }
}

export function useCookieConsentContext() {
  return useContext(CookieConsentContext)
}

export const ContextualCookieConsent: React.FC<Partial<CookieConsentProps>> = props => {
  const configuration = useCookieConsentContext()

  const Component = configuration.visibleByDefault ? VisibleCookieConsent : CookieConsent

  return <Component {...props} />
}
