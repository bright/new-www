import CookieConsent from 'react-cookie-consent'
import { CookieConsentProps } from 'react-cookie-consent/dist/CookieConsent.props'
import React, { createContext, useContext, useMemo } from 'react'
import { hasUserDecidedOnConsent } from './local-storage-constants'

const CookieConsentContext = createContext({ visibleByDefault: false })
const userDecidedOnConsent = hasUserDecidedOnConsent()
export const CookieConsentContextWrapper: React.FC<{ visibleByDefault?: boolean }> = function ({
  children,
  visibleByDefault,
}) {
  return (
    <CookieConsentContext.Provider
      value={{
        visibleByDefault: typeof visibleByDefault == 'boolean' ? visibleByDefault : !userDecidedOnConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

class VisibleCookieConsent extends CookieConsent {
  constructor(props: CookieConsentProps, context: any) {
    super(props, context)
    this.state = {
      ...this.state,
      visible: true,
    }
  }
}

export const ContextualCookieConsent: React.FC<Partial<CookieConsentProps>> = props => {
  const configuration = useContext(CookieConsentContext)

  const Component = useMemo(() => {
    console.log('CookieConsentContext', configuration)
    return configuration.visibleByDefault ? VisibleCookieConsent : CookieConsent
  }, [])

  return <Component {...props} />
}
