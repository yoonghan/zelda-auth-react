import Profile from '.'
import { render, waitFor, within } from '@testing-library/react'
import { urls } from '../../routes/const'
import { UpdateUserRequest } from '@walcron/zelda-shared-context'
import userEvent from '@testing-library/user-event'

describe('Profile', () => {
  const renderComponent = async (
    { displayName }: UpdateUserRequest,
    onUpdateUser = jest.fn(),
    onUpdateUserAdditionalInfo = jest.fn(),
    onGetUserAdditionalInfo = jest.fn()
  ) => {
    const result = render(
      <Profile
        displayName={displayName}
        onUpdateUser={onUpdateUser}
        onUpdateUserAdditionalInfo={onUpdateUserAdditionalInfo}
        onGetUserAdditionalInfo={onGetUserAdditionalInfo}
      />
    )

    await waitFor(() => {
      expect(
        result.queryByTestId('complicatedform-loader')
      ).not.toBeInTheDocument()
    })

    return result
  }

  it('should render login component correctly', async () => {
    const { getByText } = await renderComponent({
      displayName: 'Mary Jane',
    })
    expect(getByText('Welcome')).toBeInTheDocument()
    expect(
      within(getByText('Welcome')).getByText('Mary Jane')
    ).toBeInTheDocument()
  })

  describe('salutations', () => {
    it('should show loading state if input is correct', async () => {
      const mockUpdateUser = jest.fn()
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      mockUpdateUser.mockImplementation(() => new Promise(() => {}))
      const { findByTestId, getByRole } = await renderComponent(
        { displayName: 'Offer' },
        mockUpdateUser
      )
      await userEvent.click(
        getByRole('button', { name: 'Update Display Name' })
      )

      expect(await findByTestId('loader')).toBeVisible()
    })

    it('should be able to submit valid data', async () => {
      const mockUpdateUser = jest.fn()
      mockUpdateUser.mockResolvedValue({
        isProfileUpdated: true,
        error: undefined,
      })
      const { getByLabelText, getByTestId, findByText, getByText } =
        await renderComponent({ displayName: '' }, mockUpdateUser)
      await userEvent.clear(getByLabelText('Display Name *'))
      await userEvent.type(getByLabelText('Display Name *'), 'John Wick{enter}')

      expect(mockUpdateUser).toHaveBeenCalledWith({ displayName: 'John Wick' })

      expect(await findByText('Updated Salutations')).toBeInTheDocument()
      expect(getByText('Salutations - Updated.')).toBeInTheDocument()
      expect(await findByText('Latest update to (Salutations): Updated.'))
      expect(getByTestId('loader')).not.toBeVisible()
    })

    it('should be able to submit invalid data', async () => {
      const mockUpdateUser = jest.fn()
      mockUpdateUser.mockResolvedValue({
        isProfileUpdated: false,
        error: 'Fail to Update',
      })
      const {
        getByLabelText,
        getByTestId,
        findByText,
        getByText,
        getByRole,
        queryByText,
      } = await renderComponent({ displayName: '' }, mockUpdateUser)
      await userEvent.clear(getByLabelText('Display Name *'))
      await userEvent.type(getByLabelText('Display Name *'), 'John Wick{enter}')

      expect(await findByText('Updated Salutations')).toBeInTheDocument()
      expect(getByText('Salutations - Fail To Update.')).toBeInTheDocument()
      expect(getByText('Fail to Update')).toBeInTheDocument()
      expect(
        await findByText('Latest update to (Salutations): Fail To Update.')
      )
      expect(getByTestId('loader')).not.toBeVisible()

      await userEvent.click(getByRole('button', { name: 'Close' }))
      expect(queryByText('Updated Salutations')).not.toBeVisible()
    })
  })

  describe('change password', () => {
    it('should be able to change password', async () => {
      const { getByRole } = await renderComponent({
        displayName: 'Mary Jane',
      })

      await userEvent.click(getByRole('button', { name: 'Password Change' }))

      expect(getByRole('link', { name: 'Change Password' })).toHaveAttribute(
        'href',
        urls.changePassword
      )
    })
  })
})
