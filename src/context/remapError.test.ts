import { remapAuthenticationError } from './remapError'

describe('remapError', () => {
  describe('remapAuthenticationError', () => {
    it('should accept null and undefined', () => {
      expect(remapAuthenticationError(null)).toBeNull()
      expect(remapAuthenticationError(undefined)).toBeUndefined()
    })

    it('should return firebase errors if error is from Firebase', () => {
      expect(remapAuthenticationError('Firebase: error')).toBe('Issue - error')
      expect(
        remapAuthenticationError(
          'Firebase: Error (auth/invalid-login-credentials).'
        )
      ).toBe('Invalid username and password.')
      expect(
        remapAuthenticationError('Firebase: Error (auth/email-already-in-use).')
      ).toBe('Email already exists.')
      expect(
        remapAuthenticationError(
          'Firebase: Domain not whitelisted by project (auth/unauthorized-continue-uri).'
        )
      ).toBe('System configuration issue, please contact admin.')
    })

    it('should return error as it is by default', () => {
      expect(remapAuthenticationError('Not Firebase')).toBe('Not Firebase')
    })
  })
})
