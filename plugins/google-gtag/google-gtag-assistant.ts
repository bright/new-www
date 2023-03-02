export const storage =
  typeof sessionStorage !== 'undefined'
    ? sessionStorage
    : {
        getItem: () => null,
        setItem() {},
      }

export function isConnectedToGoogleGtagAssistant(location: Location | undefined) {
  return location?.search?.includes('gtm_debug') || storage.getItem('isConnectedToGtagDebugger') == 'true'
}

export function setIsConnectedToGoogleGtagAssistant(isConnectedToGtagDebugger: boolean) {
  storage.setItem('isConnectedToGtagDebugger', String(isConnectedToGtagDebugger))
}
