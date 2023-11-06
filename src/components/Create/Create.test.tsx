import Confirm from '.'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { urls } from '../../routes/const'
import type { OnCreate } from '../../types/authentication'

describe('Create', () => {
  const renderComponent = (
    onCreate: OnCreate = jest.fn(),
    errorMessage = undefined,
    isProcessing = false
  ) =>
    render(
      <Confirm
        onCreate={onCreate}
        error={errorMessage}
        isProcessing={isProcessing}
      />
    )

  it('should render login component correctly', () => {
    const { getByRole, getByText, getByLabelText, queryByRole, queryByTestId } =
      renderComponent()
    expect(getByText('Create User')).toBeInTheDocument()
    expect(
      getByText('We thank you for taking interest in signing up with us.')
    ).toBeInTheDocument()

    expect(getByRole('link', { name: 'Sign In' })).toHaveAttribute(
      'href',
      urls.signin
    )

    expect(getByLabelText('Email Address *')).toBeInTheDocument()
    expect(getByLabelText('Display Name *')).toBeInTheDocument()
    expect(getByLabelText('Password *')).toBeInTheDocument()
    expect(getByLabelText('Confirm Password *')).toBeInTheDocument()
    expect(
      getByRole('checkbox', { name: 'I agree to create.' })
    ).toBeInTheDocument()

    expect(getByRole('button', { name: 'Create' })).toBeInTheDocument()

    expect(getByText(/^Copyright ©.*2023\.$/)).toBeInTheDocument()

    expect(queryByRole('alert')).not.toBeInTheDocument()

    expect(queryByTestId('loader')).not.toBeVisible()
  })

  it('should show loading if return render is loading', async () => {
    const { queryByTestId } = renderComponent(jest.fn(), '', true)
    expect(queryByTestId('loader')).toBeVisible()
  })

  describe('Validation', () => {
    it('should indicate email and password is not entered if user submit', async () => {
      const onCreateMock = jest.fn()
      const { getByRole, getByText } = renderComponent(onCreateMock)
      await userEvent.click(getByRole('button', { name: 'Create' }))
      expect(getByText('Email address is required')).toBeInTheDocument()
      expect(getByText('Display name is required')).toBeInTheDocument()
      expect(getByText('Password is required')).toBeInTheDocument()
      expect(getByText('Confirm password is required')).toBeInTheDocument()
      expect(getByText("Please check 'I agree to create'")).toBeInTheDocument()
    })

    it('should enable form enter press', async () => {
      const onCreateMock = jest.fn()
      const { getByLabelText, getByRole, getByText } =
        renderComponent(onCreateMock)
      await userEvent.type(getByLabelText('Email Address *'), '{enter}')
      expect(getByRole('alert')).toBeInTheDocument()
      expect(getByText('Email address is required')).toBeInTheDocument()
    })

    it('should display error for invalid input', async () => {
      const onCreateMock = jest.fn()
      const { getByLabelText, findByText, getByText } =
        renderComponent(onCreateMock)
      await userEvent.type(getByLabelText('Email Address *'), 'walcron')
      await userEvent.type(getByLabelText('Display Name *'), 'hello  012')
      await userEvent.type(getByLabelText('Password *'), 'abc')
      await userEvent.type(getByLabelText('Confirm Password *'), '1233{enter}')
      expect(await findByText('Email address is invalid')).toBeInTheDocument()
      expect(await findByText('Display name is invalid')).toBeInTheDocument()
      expect(getByText('Password min length is 6')).toBeInTheDocument()
      expect(
        getByText("Your confirmed password doesn't match")
      ).toBeInTheDocument()
    })
  })

  describe('login', () => {
    it('should be able to signin with valid authenticationg', async () => {
      const onCreateMock = jest.fn()
      const { getByLabelText, getByRole } = renderComponent(onCreateMock)
      await userEvent.type(
        getByLabelText('Email Address *'),
        'walcron@email.com'
      )
      await userEvent.type(getByLabelText('Display Name *'), 'walcron')
      await userEvent.type(getByLabelText('Password *'), 'testPassword')
      await userEvent.type(getByLabelText('Confirm Password *'), 'testPassword')
      await userEvent.click(
        getByRole('checkbox', { name: 'I agree to create.' })
      )
      await userEvent.click(getByRole('button', { name: 'Create' }))
      expect(onCreateMock).toHaveBeenCalled()
    })

    it('should be show exception when sign in failed', async () => {
      const errorMessage = 'Sorry, unable to create'
      const onCreateMock = jest.fn()
      const { getByText } = renderComponent(onCreateMock, errorMessage)
      expect(getByText(errorMessage)).toBeInTheDocument()
    })
  })
})
