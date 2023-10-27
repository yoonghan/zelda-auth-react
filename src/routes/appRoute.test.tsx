import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import routes from './appRoute'
import { AuthenticationProvider } from '../context/authentication'
import {
  setupAuthAsLoggedIn,
  setupAuthAsLoggedOut,
} from '../__mocks__/@walcron/zelda-shared-context'

describe('appRoute', () => {
  const Wrapper = ({ goto }: { goto: string[] }) => {
    const router = createMemoryRouter(routes, { initialEntries: goto })
    return (
      <AuthenticationProvider>
        <RouterProvider router={router} />
      </AuthenticationProvider>
    )
  }

  it('should show exception when the route is not valid', () => {
    const mock = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(<Wrapper goto={['/isnotvalid']} />)
    expect(screen.getByText('Not Found')).toBeInTheDocument()
    mock.mockRestore()
  })

  it('should show be able to navigate to root', () => {
    render(<Wrapper goto={['/auth']} />)
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument()
  })

  it('should show be able to navigate to /about', () => {
    render(<Wrapper goto={['/auth/about']} />)
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument()
  })

  describe('logged in', () => {
    beforeEach(() => {
      setupAuthAsLoggedIn()
    })

    const renderComponent = ({ goto }: { goto: string[] }) => {
      const router = createMemoryRouter(routes, { initialEntries: goto })
      return render(
        <AuthenticationProvider>
          <RouterProvider router={router} />
        </AuthenticationProvider>
      )
    }

    it('should navigate to profile and not redirected', async () => {
      const { findByText } = renderComponent({ goto: ['/', '/auth/profile'] })
      expect(await findByText('Logged in')).toBeInTheDocument()
    })

    it('should navigate to profile if access from sign in', async () => {
      const { findByText } = renderComponent({ goto: ['/', '/auth/login'] })
      expect(await findByText('Logged in')).toBeInTheDocument()
    })

    it('should navigate to profile if access from create', async () => {
      const { findByText } = render(<Wrapper goto={['/auth/create']} />)
      expect(await findByText('Logged in')).toBeInTheDocument()
    })

    it('should navigate to profile if access from forgot-password', async () => {
      const { findByText } = render(
        <Wrapper goto={['/auth/forgot-password']} />
      )
      expect(await findByText('Logged in')).toBeInTheDocument()
    })

    it('should navigate to change-password and not redireced', async () => {
      const { findByText } = render(
        <Wrapper goto={['/auth/change-password']} />
      )
      expect(await findByText('Change Password')).toBeInTheDocument()
    })

    it('should navigate to sigin if access from logout', async () => {
      const { findByText } = render(<Wrapper goto={['/auth/logout']} />)
      expect(await findByText('Signing out')).toBeInTheDocument()
    })
  })

  describe('logged out', () => {
    beforeEach(() => {
      setupAuthAsLoggedOut()
    })

    const renderComponent = ({ goto }: { goto: string[] }) => {
      const router = createMemoryRouter(routes, { initialEntries: goto })
      return render(
        <AuthenticationProvider>
          <RouterProvider router={router} />
        </AuthenticationProvider>
      )
    }

    it('should navigate to sigin if not logged in', async () => {
      const { findByText } = render(<Wrapper goto={['/auth/profile']} />)
      expect(await findByText('Sign in')).toBeInTheDocument()
    })

    it('should navigate to sign in and not redirected', async () => {
      const { findByText } = renderComponent({ goto: ['/', '/auth/login'] })
      expect(await findByText('Sign in')).toBeInTheDocument()
    })

    it('should navigate to create and not redirected', async () => {
      const { findByText } = render(<Wrapper goto={['/auth/create']} />)
      expect(await findByText('Create User')).toBeInTheDocument()
    })

    it('should navigate to forgot-password and not redirected', async () => {
      const { findByText } = render(
        <Wrapper goto={['/auth/forgot-password']} />
      )
      expect(await findByText('Reset a forgotten password')).toBeInTheDocument()
    })

    it('should navigate to sigin if not logged in', async () => {
      const { findByText } = render(
        <Wrapper goto={['/auth/change-password']} />
      )
      expect(await findByText('Sign in')).toBeInTheDocument()
    })

    it('should navigate to signout and remained', async () => {
      const { findByText } = render(<Wrapper goto={['/auth/logout']} />)
      expect(await findByText('Sign in')).toBeInTheDocument()
    })
  })
})
