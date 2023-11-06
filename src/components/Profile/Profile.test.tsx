import Profile from '.'
import { render } from '@testing-library/react'
import { urls } from '../../routes/const'
import { UpdateUserRequest } from '@walcron/zelda-shared-context'
import userEvent from '@testing-library/user-event'

describe('Profile', () => {
  const renderComponent = (
    { displayName }: UpdateUserRequest,
    onUpdateUser = jest.fn()
  ) => {
    return render(
      <Profile displayName={displayName} onUpdateUser={onUpdateUser} />
    )
  }

  it('should render login component correctly', () => {
    const { getByText, getByLabelText, getByRole } = renderComponent({
      displayName: 'Mary Jane',
    })
    expect(getByText('Logged in')).toBeInTheDocument()

    expect(getByLabelText('Display Name *')).toHaveValue('Mary Jane')

    expect(getByRole('button', { name: '65 - Singapore' })).toBeInTheDocument()
    expect(getByLabelText('Phone *')).toBeInTheDocument()

    expect(getByRole('button', { name: 'Update' })).toBeInTheDocument()

    expect(getByRole('link', { name: 'Change Password' })).toHaveAttribute(
      'href',
      urls.changePassword
    )
  })

  it('should be show error is display name is invalid', async () => {
    const mockUpdateUser = jest.fn()
    const { getByLabelText, getByText, getByRole } = renderComponent(
      { displayName: '' },
      mockUpdateUser
    )

    await userEvent.click(getByRole('button', { name: 'Update' }))
    expect(getByText('Display name is required.')).toBeInTheDocument()

    await userEvent.type(
      getByLabelText('Display Name *'),
      'John     Wick{enter}'
    )
    expect(getByText('Display name is invalid.')).toBeInTheDocument()

    expect(mockUpdateUser).not.toHaveBeenCalled()
  })

  describe('processing', () => {
    it('should show loading state if input is correct', async () => {
      const mockUpdateUser = jest.fn()
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      mockUpdateUser.mockImplementation(() => new Promise(() => {}))
      const { findByTestId, getByRole } = renderComponent(
        { displayName: 'Offer' },
        mockUpdateUser
      )
      await userEvent.click(getByRole('button', { name: 'Update' }))
      expect(await findByTestId('loader')).toBeVisible()
    })

    it('should be able to submit valid data', async () => {
      const mockUpdateUser = jest.fn()
      mockUpdateUser.mockResolvedValue({
        isProfileUpdated: true,
        error: undefined,
      })
      const { getByRole, getByLabelText, getByTestId } = renderComponent(
        { displayName: '' },
        mockUpdateUser
      )
      await userEvent.clear(getByLabelText('Display Name *'))
      await userEvent.type(getByLabelText('Display Name *'), 'John Wick')
      await userEvent.click(getByRole('button', { name: 'Update' }))

      expect(mockUpdateUser).toHaveBeenCalledWith({ displayName: 'John Wick' })
      expect(await getByTestId('loader')).not.toBeVisible()
    })

    it('should be able to submit valid data', async () => {
      const mockUpdateUser = jest.fn()
      mockUpdateUser.mockResolvedValue({
        isProfileUpdated: false,
        error: 'Fail to Update',
      })
      const { getByRole, getByLabelText, getByTestId, findByText } =
        renderComponent({ displayName: '' }, mockUpdateUser)
      await userEvent.clear(getByLabelText('Display Name *'))
      await userEvent.type(getByLabelText('Display Name *'), 'John Wick')
      await userEvent.click(getByRole('button', { name: 'Update' }))

      expect(await findByText('Fail to Update')).toBeInTheDocument()
      expect(await getByTestId('loader')).not.toBeVisible()
    })
  })
})
