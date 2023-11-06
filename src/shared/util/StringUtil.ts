export const isEmpty = (value: string | null | undefined) => {
  return value === undefined || value === null || value.trim() === ''
}
