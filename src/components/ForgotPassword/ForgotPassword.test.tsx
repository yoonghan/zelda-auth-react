import type { EmailPasswordResetResponse } from '@walcron/zelda-shared-context'
import ForgotPassword from '.'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { urls } from '../../routes/const'

describe('ForgotPassword', () => {
  const renderComponent = (
    loggedIn = false,
    onSendEmailToResetPassword: (
      email: string
    ) => Promise<EmailPasswordResetResponse> = jest.fn()
  ) =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <ForgotPassword
                loggedIn={loggedIn}
                onSendEmailToResetPassword={onSendEmailToResetPassword}
              />
            }
          ></Route>
          <Route path="/auth/profile" element={<div>Profile</div>}></Route>
        </Routes>
      </MemoryRouter>
    )

  describe(' logged in', () => {
    it('should redirect if user is logged in', () => {
      const { getByText } = renderComponent(true)
      expect(getByText('Profile')).toBeInTheDocument()
    })
  })

  describe('not logged in', () => {
    it('should default render forgot password form', () => {
      const { getByText, getByRole } = renderComponent(false)
      expect(getByText('Reset a forgotten password')).toBeInTheDocument()
      expect(
        getByRole('button', { name: 'Reset My Password' })
      ).toBeInTheDocument()
    })

    it('should inform user when password is successfully reset', async () => {
      const mockEmailSent = jest.fn()
      mockEmailSent.mockResolvedValue({
        isSent: true,
        error: undefined,
      })
      const { getByText, getByLabelText } = renderComponent(
        false,
        mockEmailSent
      )
      await userEvent.type(
        getByLabelText('Email Address *'),
        'test@email.com{enter}'
      )
      expect(
        getByText('Reset email has been sent, check your (test@email.com).')
      ).toBeInTheDocument()
    })
  })
})
