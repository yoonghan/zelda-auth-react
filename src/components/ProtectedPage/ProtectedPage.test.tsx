import { render } from '@testing-library/react'
import ProtectedPage from '.'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthenticationProvider } from '../../context/authentication'
import {
  setupAuthAsLoggedIn,
  setupAuthAsLoggedOut,
} from '../../__mocks__/@walcron/zelda-shared-context'

describe('ProtectedPage', () => {
  const renderComponent = ({
    redirectTo,
  }: {
    redirectTo: 'Profile' | 'SignIn'
  }) =>
    render(
      <AuthenticationProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedPage failRedirectTo={redirectTo}>
                  {() => <>Component</>}
                </ProtectedPage>
              }
            ></Route>
            <Route path="/auth/profile" element={<div>Profile</div>}></Route>
            <Route path="/auth/login" element={<div>Sign In</div>}></Route>
          </Routes>
        </MemoryRouter>
      </AuthenticationProvider>
    )

  describe('logged in', () => {
    beforeEach(() => {
      setupAuthAsLoggedIn()
    })

    it('should redirect to Profile if logged in and has displayName', () => {
      const { getByText } = renderComponent({
        redirectTo: 'Profile',
      })
      expect(getByText('Profile')).toBeInTheDocument()
    })

    it('should not redirect to Profile if logged in but has no displayName', () => {
      setupAuthAsLoggedIn('')
      const { getByText } = renderComponent({
        redirectTo: 'Profile',
      })
      expect(getByText('Component')).toBeInTheDocument()
    })

    it('should not redirect to SignIn if logged in', async () => {
      const { findByText } = renderComponent({
        redirectTo: 'SignIn',
      })
      expect(await findByText('Component')).toBeInTheDocument()
    })
  })

  describe('logged out', () => {
    beforeEach(() => {
      setupAuthAsLoggedOut()
    })

    it('should not redirect to Profile if logged out', () => {
      const { getByText } = renderComponent({
        redirectTo: 'Profile',
      })
      expect(getByText('Component')).toBeInTheDocument()
    })

    it('should redirect to SignIn if logged out', async () => {
      const { findByText } = renderComponent({
        redirectTo: 'SignIn',
      })
      expect(await findByText('Sign In')).toBeInTheDocument()
    })
  })
})
