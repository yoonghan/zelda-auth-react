import ChangePassword from '.'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { urls } from '../../routes/const'
import type { OnChangePassword } from '../../types/authentication'

describe('ChangePassword', () => {
  const renderComponent = (onChangePassword: OnChangePassword = jest.fn()) =>
    render(<ChangePassword onChangePassword={onChangePassword} />)

  it('should render component correctly', () => {
    const { getByText, getByLabelText, getByRole } = renderComponent()
    expect(getByText('Change Password')).toBeInTheDocument()
    expect(getByLabelText('Old Password *')).toBeInTheDocument()
    expect(getByLabelText('New Password *')).toBeInTheDocument()
    expect(getByLabelText('Retype New Password *')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Update Password' })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Return to Profile' })).toHaveAttribute(
      'href',
      urls.profile
    )
  })

  it('should show error if input is blank', async () => {
    const { getByText, findByText, getByRole } = renderComponent()

    await userEvent.click(getByRole('button', { name: 'Update Password' }))
    expect(await findByText('Old Password is required')).toBeInTheDocument()
    expect(getByText('New Password is required')).toBeInTheDocument()
    expect(getByText('Retype new password is required')).toBeInTheDocument()
  })

  it('should show error if retype password is incorrect', async () => {
    const { getByLabelText, findByText } = renderComponent()
    await userEvent.type(getByLabelText('New Password *'), 'abc')
    await userEvent.type(getByLabelText('Retype New Password *'), '1233{enter}')
    expect(await findByText('Password min length is 6')).toBeInTheDocument()
    expect(
      await findByText("Your new password doesn't match")
    ).toBeInTheDocument()
  })

  describe('processing', () => {
    const inputValidValues = async () => {
      await userEvent.type(screen.getByLabelText('Old Password *'), 'abc')
      await userEvent.type(screen.getByLabelText('New Password *'), 'abc123')
      await userEvent.type(
        screen.getByLabelText('Retype New Password *'),
        'abc123{enter}'
      )
    }

    it('should show loading state if input is correct', async () => {
      const mockChangePassword = jest.fn()
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      mockChangePassword.mockImplementation(() => new Promise(() => {}))
      const { findByTestId } = renderComponent(mockChangePassword)
      await inputValidValues()
      expect(await findByTestId('loader')).toBeVisible()
    })

    it('should update password successfully and inputs are resetted', async () => {
      const mockChangePassword = jest.fn()
      mockChangePassword.mockResolvedValue({
        isChanged: true,
        error: undefined,
      })
      const { getByTestId, getByText, getByLabelText } =
        renderComponent(mockChangePassword)
      await inputValidValues()
      expect(mockChangePassword).toHaveBeenCalledWith('abc', 'abc123')
      expect(getByTestId('loader')).not.toBeVisible()
      expect(getByText('Your new has been updated!')).toBeInTheDocument()

      expect(getByLabelText('Old Password *')).toHaveValue('')
      expect(getByLabelText('New Password *')).toHaveValue('')
      expect(getByLabelText('Retype New Password *')).toHaveValue('')
    })

    it('should show error if password change failed', async () => {
      const mockChangePassword = jest.fn()
      mockChangePassword.mockResolvedValue({
        isChanged: false,
        error: 'Fail to Update',
      })
      const { getByTestId, getByText } = renderComponent(mockChangePassword)
      await inputValidValues()
      expect(getByTestId('loader')).not.toBeVisible()
      expect(getByText('Fail to Update')).toBeInTheDocument()
    })
  })
})
