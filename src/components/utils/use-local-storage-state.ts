
import React from 'react'
import { isBrowser } from '../../utils'

function useLocalStorageState(
  key: string,
  defaultValue = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = isBrowser() ? window.localStorage.getItem(key) : ''
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return defaultValue
  })

  React.useEffect(() => {
    if (isBrowser()) {
      window.localStorage.setItem(key, serialize(state))
    }
  }, [key, state, serialize])

  return [state, setState]
}

export {useLocalStorageState}