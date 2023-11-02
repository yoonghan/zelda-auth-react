import { emailPattern, namePattern } from './validation'

describe('shared/validation', () => {
  it('should only allow valid email', () => {
    expect(emailPattern.test('not valid')).toBe(false)
    expect(emailPattern.test('email@test')).toBe(false)
    expect(emailPattern.test('email@test.com')).toBe(true)
  })

  it('should only allow valid name', () => {
    expect(namePattern.test('not  valid')).toBe(false)
    expect(namePattern.test('email@test')).toBe(false)
    expect(namePattern.test('mary jane parker')).toBe(true)
    expect(namePattern.test('düsseldorf jane rune')).toBe(true)
    expect(namePattern.test('lo0t lo0t')).toBe(true)
  })
})
