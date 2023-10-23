import { render } from '@testing-library/react'
import EmailSentMessage from './EmailSentMessage'
import { urls } from '../../routes/const'

describe('EmailSentMessage', () => {
  const renderComponent = (email: string = 'testemail@gmail.com') =>
    render(<EmailSentMessage email={email} />)

  it('should render component with static values', () => {
    const { getByText, getByRole } = renderComponent('testmail@MAIL.com')
    expect(
      getByText('Reset email has been sent, check your (testmail@mail.com).')
    ).toBeInTheDocument()
    expect(getByRole('link', { name: 'Return to sign in' })).toHaveAttribute(
      'href',
      urls.signin
    )
  })
})
