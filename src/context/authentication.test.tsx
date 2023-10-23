import {
  AuthenticationConsumer,
  AuthenticationProvider,
  defaultProps,
} from './authentication'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  login,
  logout,
  create,
  changePassword,
  resetEmail,
} from '@walcron/zelda-shared-context'

describe('authentication', () => {
  it('should have correct authentication defaults', async () => {
    expect(defaultProps.error).toBeUndefined()
    expect(defaultProps.loggedIn).toBeFalsy()
    defaultProps.onSignIn('user', 'password')
    defaultProps.onCreate('user', 'password')
    defaultProps.onSignOut()
    expect(
      await defaultProps.onSendEmailToResetPassword('email')
    ).toStrictEqual({
      isSent: false,
      error: undefined,
    })
    expect(await defaultProps.onUpdatePassword('old', 'new')).toStrictEqual({
      isChanged: false,
      error: undefined,
    })
  })

  describe('provider', () => {
    it('should authenticate properly', async () => {
      const { getByTestId } = render(
        <AuthenticationProvider>
          <AuthenticationConsumer>
            {({
              onCreate,
              onSignIn,
              onSignOut,
              onSendEmailToResetPassword,
              onUpdatePassword,
              error,
            }) => (
              <>
                <button
                  onClick={() => {
                    onCreate('username', 'password')
                  }}
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    onSignIn('username', 'password')
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    void onSendEmailToResetPassword('email').then(() => {})
                  }}
                >
                  Reset Email
                </button>
                <button
                  onClick={() => {
                    void onUpdatePassword('old', 'new').then(() => {})
                  }}
                >
                  Update Password
                </button>
                <button onClick={onSignOut}>Sign Out</button>
                <div data-testid={'error'}>{error}</div>
              </>
            )}
          </AuthenticationConsumer>
        </AuthenticationProvider>
      )
      await userEvent.click(screen.getByRole('button', { name: 'Create' }))
      expect(create).toHaveBeenCalled()
      await userEvent.click(screen.getByRole('button', { name: 'Sign In' }))
      expect(login).toHaveBeenCalled()
      expect(getByTestId('error')).toHaveTextContent('Issue - login')
      await userEvent.click(screen.getByRole('button', { name: 'Sign Out' }))
      expect(logout).toHaveBeenCalled()
      await userEvent.click(screen.getByRole('button', { name: 'Reset Email' }))
      expect(resetEmail).toHaveBeenCalled()
      await userEvent.click(
        screen.getByRole('button', { name: 'Update Password' })
      )
      expect(changePassword).toHaveBeenCalled()
    })
  })
})
