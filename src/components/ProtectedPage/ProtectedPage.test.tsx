import { render } from '@testing-library/react'
import ProtectedPage from '.'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('ProtectedPage', () => {
  const renderComponent = ({
    loggedIn,
    redirectTo,
  }: {
    loggedIn: boolean
    redirectTo: 'Profile' | 'SignIn'
  }) =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage loggedIn={loggedIn} redirectTo={redirectTo}>
                Component
              </ProtectedPage>
            }
          ></Route>
          <Route path="/auth/profile" element={<div>Profile</div>}></Route>
          <Route path="/auth/login" element={<div>Sign In</div>}></Route>
        </Routes>
      </MemoryRouter>
    )

  it('should redirect to Profile if logged in', () => {
    const { getByText } = renderComponent({
      loggedIn: true,
      redirectTo: 'Profile',
    })
    expect(getByText('Profile')).toBeInTheDocument()
  })

  it('should not redirect to Profile if logged out', () => {
    const { getByText } = renderComponent({
      loggedIn: false,
      redirectTo: 'Profile',
    })
    expect(getByText('Component')).toBeInTheDocument()
  })

  it('should not redirect to SignIn if logged in', () => {
    const { getByText } = renderComponent({
      loggedIn: true,
      redirectTo: 'SignIn',
    })
    expect(getByText('Component')).toBeInTheDocument()
  })

  it('should redirect to SignIn if logged out', () => {
    const { getByText } = renderComponent({
      loggedIn: false,
      redirectTo: 'SignIn',
    })
    expect(getByText('Sign In')).toBeInTheDocument()
  })
})
