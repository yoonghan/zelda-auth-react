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
  updateUser,
  updateUserAdditionalInfo,
  getUserAdditionalInfo,
} from '@walcron/zelda-shared-context'
import {
  changePassword as mockChangePassword,
  resetEmail as mockResetEmail,
  updateUser as mockUpdateUser,
} from '../__mocks__/@walcron/zelda-shared-context'

describe('authentication', () => {
  it('should have correct authentication defaults', async () => {
    expect(defaultProps.error).toBeUndefined()
    expect(defaultProps.loggedIn).toBeFalsy()
    expect(defaultProps.displayName).toBeNull()
    expect(defaultProps.isProcessing).toBeFalsy()
    defaultProps.onSignIn('user', 'password')
    defaultProps.onCreate('user', 'password', 'displayName')
    void defaultProps.onSignOut()
    expect(
      await defaultProps.onSendEmailToResetPassword('email')
    ).toStrictEqual({
      isSent: false,
      error: undefined,
    })
    expect(await defaultProps.onChangePassword('old', 'new')).toStrictEqual({
      isChanged: false,
      error: undefined,
    })
    expect(
      await defaultProps.onUpdateUser({ displayName: 'Han' })
    ).toStrictEqual({
      isProfileUpdated: false,
      error: undefined,
    })
    expect(
      await defaultProps.onUpdateUserAdditionalInfo({ contacts: undefined })
    ).toStrictEqual({
      isAdditionaUserInfoUpdated: false,
      error: undefined,
    })
    expect(await defaultProps.onGetUserAdditionalInfo()).toStrictEqual({
      contacts: undefined,
      mailingAddress: undefined,
      preferences: undefined,
    })
  })

  describe('provider', () => {
    it('should authenticate properly', async () => {
      mockChangePassword.mockResolvedValue({
        error: 'Firebase: change password',
      })
      mockResetEmail.mockResolvedValue({
        error: 'Firebase: reset email',
      })
      mockUpdateUser.mockResolvedValue({
        error: 'Firebase: change user',
      })
      let updatedError = ''
      const { getByTestId } = render(
        <AuthenticationProvider>
          <AuthenticationConsumer>
            {({
              onCreate,
              onSignIn,
              onSignOut,
              onSendEmailToResetPassword,
              onChangePassword,
              onUpdateUser,
              onUpdateUserAdditionalInfo,
              onGetUserAdditionalInfo,
              error,
              isProcessing,
            }) => (
              <>
                <button
                  onClick={() => {
                    onCreate('username', 'password', 'displayName')
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
                    void onSendEmailToResetPassword('email').then(
                      (response) => {
                        updatedError = response.error
                      }
                    )
                  }}
                >
                  Reset Email
                </button>
                <button
                  onClick={() => {
                    void onChangePassword('old', 'new').then((response) => {
                      updatedError = response.error
                    })
                  }}
                >
                  Update Password
                </button>
                <button
                  onClick={() => {
                    void onUpdateUser({ displayName: 'clap clap' }).then(
                      (response) => {
                        updatedError = response.error
                      }
                    )
                  }}
                >
                  Update User
                </button>
                <button
                  onClick={() => {
                    void onUpdateUserAdditionalInfo({ contacts: [] }).then(
                      () => {}
                    )
                  }}
                >
                  Update User Additional Info
                </button>
                <button
                  onClick={() => {
                    void onGetUserAdditionalInfo().then(() => {})
                  }}
                >
                  Get User Additional Info
                </button>
                <button
                  onClick={() => {
                    void onSignOut()
                  }}
                >
                  Sign Out
                </button>
                <div data-testid={'error'}>{error}</div>
                <div data-testid={'is-processing'}>
                  {isProcessing ? 'true' : 'false'}
                </div>
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
      expect(updatedError).toBe('Issue - reset email')
      await userEvent.click(
        screen.getByRole('button', { name: 'Update Password' })
      )
      expect(changePassword).toHaveBeenCalled()
      expect(updatedError).toBe('Issue - change password')
      await userEvent.click(screen.getByRole('button', { name: 'Update User' }))
      expect(updateUser).toHaveBeenCalled()
      expect(updatedError).toBe('Issue - change user')
      expect(getByTestId('is-processing')).toHaveTextContent('false')

      await userEvent.click(
        screen.getByRole('button', { name: 'Update User Additional Info' })
      )
      expect(updateUserAdditionalInfo).toHaveBeenCalled()

      await userEvent.click(
        screen.getByRole('button', { name: 'Get User Additional Info' })
      )
      expect(getUserAdditionalInfo).toHaveBeenCalled()
    })
  })
})
