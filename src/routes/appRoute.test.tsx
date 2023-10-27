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

  it('should show be able to navigate to /auth', () => {
    render(<Wrapper goto={['/auth/login']} />)
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument()
  })

  it('should show be able to navigate to /auth/login', () => {
    render(<Wrapper goto={['/auth/login']} />)
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument()
  })

  it('should show be able to navigate to /auth/create', () => {
    render(<Wrapper goto={['/auth/create']} />)
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument()
  })

  it('should show be able to navigate to /auth/forgot-password', () => {
    render(<Wrapper goto={['/auth/forgot-password']} />)
    expect(screen.queryByText('Not Found')).not.toBeInTheDocument()
  })

  // Remove since user is not logged in
  // it('should show be able to navigate to /auth/change-password', () => {
  //   render(<Wrapper goto={['/auth/change-password']} />)
  //   expect(screen.queryByText('Not Found')).not.toBeInTheDocument()
  // })

  // Remove logout since it will cause a loop.
  // it("should show be able to navigate to /auth/logout", () => {
  //   render(<Wrapper goto={["/auth/logout"]} />);
  //   expect(screen.queryByText("Not Found")).not.toBeInTheDocument();
  // });

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

    it('should navigate to sign in when go to profile', async () => {
      const { findByText } = renderComponent({ goto: ['/', '/auth/profile'] })
      expect(await findByText('Sign in')).toBeInTheDocument()
    })
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
  })
})
