import { render } from '@testing-library/react'
import DisplayNameForm from '.'
import userEvent from '@testing-library/user-event'

describe('DisplayNameForm', () => {
  const renderComponent = ({
    defaultDisplayName = 'Jack',
    isProcessing = false,
    updateUser = jest.fn(),
  }: {
    defaultDisplayName?: string
    isProcessing?: boolean
    updateUser?: () => void
  }) =>
    render(
      <DisplayNameForm
        defaultDisplayName={defaultDisplayName}
        isProcessing={isProcessing}
        updateUser={updateUser}
      />
    )

  it('should render form correctly', () => {
    const { getByLabelText, getByRole } = renderComponent({})

    expect(getByLabelText('Display Name *')).toHaveValue('Jack')

    expect(
      getByRole('button', { name: 'Update Display Name' })
    ).toBeInTheDocument()
  })

  it('should be show error is display name is invalid', async () => {
    const mockUpdateUser = jest.fn()
    const { getByLabelText, getByText, getByRole, findByText } =
      renderComponent({
        defaultDisplayName: '',
        updateUser: mockUpdateUser,
      })

    await userEvent.click(getByRole('button', { name: 'Update Display Name' }))
    expect(getByText('Display name is required.')).toBeInTheDocument()

    await userEvent.type(
      getByLabelText('Display Name *'),
      'John     Wick{enter}'
    )
    expect(await findByText('Display name is invalid.')).toBeInTheDocument()

    expect(mockUpdateUser).not.toBeCalled()
  })

  describe('processing', () => {
    it('should disable form if processing', () => {
      const { getByRole } = renderComponent({
        isProcessing: true,
      })
      expect(getByRole('group')).toBeDisabled()
      expect(
        getByRole('button', { name: 'Update Display Name' })
      ).toBeDisabled()
    })

    it('should be able to submit valid data', async () => {
      const mockUpdateUser = jest.fn()
      const { getByRole, getByLabelText } = renderComponent({
        defaultDisplayName: '',
        updateUser: mockUpdateUser,
      })
      await userEvent.clear(getByLabelText('Display Name *'))
      await userEvent.type(getByLabelText('Display Name *'), 'John Wick')
      await userEvent.click(
        getByRole('button', { name: 'Update Display Name' })
      )

      expect(mockUpdateUser).toHaveBeenCalledWith({ displayName: 'John Wick' })
    })
  })
})
