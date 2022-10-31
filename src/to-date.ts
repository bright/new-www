export function toDate(date: undefined | null | string | number | Date): Date | null {
  if (!date) {
    return null
  }

  if (date instanceof Date) {
    return date
  }

  if (typeof date === 'string' && date.length === 0) {
    return null
  }

  return new Date(date)
}
