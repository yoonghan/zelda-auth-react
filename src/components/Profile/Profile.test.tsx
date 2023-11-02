import Profile from '.'
import { render, screen } from '@testing-library/react'
import { urls } from '../../routes/const'

describe('Profile', () => {
  it('should render login component correctly', () => {
    render(<Profile displayName={'Mary Jane'} />)
    expect(screen.getByText('Logged in')).toBeInTheDocument()

    expect(screen.getByLabelText('Display Name *')).toHaveValue('Mary Jane')

    expect(
      screen.getByRole('button', { name: '65 - Singapore' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Phone *')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Change Password' })
    ).toHaveAttribute('href', urls.changePassword)
  })
})
