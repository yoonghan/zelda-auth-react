import { render } from '@testing-library/react'
import MailForm from '.'
import userEvent from '@testing-library/user-event'

describe('MailForm', () => {
  const renderComponent = () => render(<MailForm />)

  it('should render component correctly', () => {
    const { getByLabelText } = renderComponent()
    expect(getByLabelText('Address *')).toBeInTheDocument()
    expect(getByLabelText('Postal Code *')).toBeInTheDocument()
    expect(getByLabelText('Country *')).toBeInTheDocument()
  })

  it('should be not able to submit is fields are missing', async () => {
    const { getByRole, getByText } = renderComponent()
    await userEvent.click(getByRole('button', { name: 'Save Mailing Address' }))
    expect(getByText('Address is required.')).toBeInTheDocument()
    expect(getByText('Postal Code is required.')).toBeInTheDocument()
  })

  it('should be able to submit and pop a message', async () => {
    const { getByRole, getByText, queryByText, getByLabelText, findByText } =
      renderComponent()
    await userEvent.type(getByLabelText('Address *'), '48, Road Avenue')
    await userEvent.type(getByLabelText('Postal Code *'), '48100')
    await userEvent.click(getByRole('button', { name: 'Save Mailing Address' }))
    expect(await findByText('Saving information')).toBeVisible()
    expect(getByText('48, Road Avenue')).toBeInTheDocument()
    expect(getByText('48100 Malaysia')).toBeInTheDocument()
    await userEvent.click(getByRole('button', { name: 'Close' }))
    expect(queryByText('Saving information')).not.toBeVisible()
  })
})