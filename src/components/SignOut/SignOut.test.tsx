import SignOut from '.'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('SignOut', () => {
  it('should render logout component correctly', async () => {
    const onSignOutFn = jest.fn()
    const { findByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<SignOut onSignOut={onSignOutFn} redirect="/auth/login" />}
          ></Route>
          <Route path="/auth/login" element={<div>Login</div>}></Route>
        </Routes>
      </MemoryRouter>
    )

    expect(await findByText('Login')).toBeInTheDocument()
    expect(onSignOutFn).toHaveBeenCalled()
  })

  it('should stay in signout page if redirect triggers itself', () => {
    const onSignOutFn = jest.fn()
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <SignOut onSignOut={onSignOutFn} redirect="/auth/logout" />
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Signing out')).toBeInTheDocument()
    expect(onSignOutFn).toHaveBeenCalled()
  })
})
