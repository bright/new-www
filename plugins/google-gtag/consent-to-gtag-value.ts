export const acceptedResultLSConsent = 'granted'
export const rejectedResultLSConsent = 'denied'

export const consentToGtagValue = (isChecked: boolean) => {
  if (isChecked) {
    return acceptedResultLSConsent
  } else {
    return rejectedResultLSConsent
  }
}
