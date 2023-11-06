import SignIn from '.'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { urls } from '../../routes/const'
import type { OnSignIn } from '../../types/authentication'

describe('SignIn', () => {
  const renderComponent = (
    onSignIn: OnSignIn = jest.fn(),
    errorMessage = undefined,
    isProcessing = false
  ) =>
    render(
      <SignIn
        onSignIn={onSignIn}
        error={errorMessage}
        isProcessing={isProcessing}
      />
    )

  it('should render login component correctly', () => {
    const { getByRole, getByText, getByLabelText, queryByRole, queryByTestId } =
      renderComponent()
    expect(getByText('Sign in')).toBeInTheDocument()

    expect(getByLabelText('Email Address *')).toBeInTheDocument()
    expect(getByLabelText('Password *')).toBeInTheDocument()

    expect(getByRole('link', { name: 'Sign me up' })).toHaveAttribute(
      'href',
      urls.create
    )
    expect(getByRole('link', { name: 'Forgot your password' })).toHaveAttribute(
      'href',
      urls.forgotPassword
    )

    expect(getByRole('button', { name: 'Sign In' })).toBeInTheDocument()

    expect(getByText(/^Copyright ©.*2023\.$/)).toBeInTheDocument()

    expect(queryByRole('alert')).not.toBeInTheDocument()

    expect(queryByTestId('loader')).not.toBeVisible()
  })

  it('should be loading if isProcessing', async () => {
    const { getByTestId } = renderComponent(jest.fn(), undefined, true)

    expect(getByTestId('loader')).toBeVisible()
  })

  describe('Validation', () => {
    it('should indicate email and password is not entered if user submit', async () => {
      const onSignInMock = jest.fn()
      const { getByRole, getByText } = renderComponent(onSignInMock)
      await userEvent.click(getByRole('button', { name: 'Sign In' }))
      expect(getByText('Email address is required')).toBeInTheDocument()
      expect(getByText('Password is required')).toBeInTheDocument()
    })

    it('should enable form enter press', async () => {
      const onSignInMock = jest.fn()
      const { getByLabelText, getByRole, getByText } =
        renderComponent(onSignInMock)
      await userEvent.type(getByLabelText('Email Address *'), '{enter}')
      expect(getByRole('alert')).toBeInTheDocument()
      expect(getByText('Email address is required')).toBeInTheDocument()
    })

    it('should display error for invalid input', async () => {
      const onCreateMock = jest.fn()
      const { getByLabelText, findByText, getByText } =
        renderComponent(onCreateMock)
      await userEvent.type(getByLabelText('Email Address *'), 'walcrontest')
      await userEvent.type(getByLabelText('Password *'), 'abc{enter}')
      expect(await findByText('Email address is invalid')).toBeInTheDocument()
      expect(getByText('Password min length is 6')).toBeInTheDocument()
    })
  })

  describe('login', () => {
    it('should be able to signin with valid authentication', async () => {
      const onSignInMock = jest.fn()
      const { getByLabelText, getByRole } = renderComponent(onSignInMock)
      await userEvent.type(
        getByLabelText('Email Address *'),
        'walcron@email.com'
      )
      await userEvent.type(getByLabelText('Password *'), 'testPassword')
      await userEvent.click(getByRole('button', { name: 'Sign In' }))
      expect(onSignInMock).toHaveBeenCalled()
    })

    it('should be show exception when sign in failed', async () => {
      const errorMessage = "Sorry, it's an invalid sign-in"
      const onSignInMock = jest.fn()
      const { getByText } = renderComponent(onSignInMock, errorMessage)
      expect(getByText(errorMessage)).toBeInTheDocument()
    })
  })
})
