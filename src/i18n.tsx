import React from 'react'
import i18next, { i18n } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import de from '../static/translations/de.yml'
import { PropsWithChildren } from 'react'

export const i18nResources = {
  de,
}

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: i18nResources,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  debug: false,
})

const i18n_en = i18next.cloneInstance({ lng: 'en' })
const i18n_de = i18next.cloneInstance({ lng: 'de' })

export function i18nForPageContext(pageContext: Record<string, unknown>) {
  if (pageContext?.language?.toString()?.toLowerCase() === 'de') {
    return i18n_de
  }

  return i18n_en
}

export const withI18next = (i18n: i18n) => (children: PropsWithChildren['children']) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
