import SignOut from '.'
import { render } from '@testing-library/react'

describe('SignOut', () => {
  it('should render logout component correctly', async () => {
    const onSignOutFn = jest.fn()
    render(<SignOut onSignOut={onSignOutFn} />)

    expect(onSignOutFn).toHaveBeenCalled()
  })
})
