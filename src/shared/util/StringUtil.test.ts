import { isEmpty } from './StringUtil'

describe('StringUtil', () => {
  it('should return true if is empty', () => {
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty(undefined)).toBeTruthy()
    expect(isEmpty('  ')).toBeTruthy()

    expect(isEmpty('Jack')).toBeFalsy()
  })
})
