import type { EmailPasswordResetResponse } from '@walcron/zelda-shared-context'
import ForgotPassword from '.'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

describe('ForgotPassword', () => {
  const renderComponent = (
    onSendEmailToResetPassword: (
      email: string
    ) => Promise<EmailPasswordResetResponse> = jest.fn()
  ) =>
    render(
      <ForgotPassword onSendEmailToResetPassword={onSendEmailToResetPassword} />
    )

  it('should default render forgot password form', () => {
    const { getByText, getByRole } = renderComponent()
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
    const { getByText, getByLabelText } = renderComponent(mockEmailSent)
    await userEvent.type(
      getByLabelText('Email Address *'),
      'test@email.com{enter}'
    )
    expect(
      getByText('Reset email has been sent, check your (test@email.com).')
    ).toBeInTheDocument()
  })
})
