
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

  const prevKeyRef = React.useRef(key)
  
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (isBrowser()) {
      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey)
      }
      window.localStorage.setItem(key, serialize(state))
    }
  }, [key, state, serialize])

  return [state, setState]
}

export {useLocalStorageState}