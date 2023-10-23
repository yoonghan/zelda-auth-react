import { emailPattern } from './validation'

describe('shared/validation', () => {
  it('should only allow valid email', () => {
    expect(emailPattern.test('not valid')).toBe(false)
    expect(emailPattern.test('email@test')).toBe(false)
    expect(emailPattern.test('email@test.com')).toBe(true)
  })
})
