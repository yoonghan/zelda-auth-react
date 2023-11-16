import { render } from '@testing-library/react'
import ComplicatedForm from '.'
import userEvent from '@testing-library/user-event'

describe('ComplicateForm', () => {
  const renderForm = () => render(<ComplicatedForm />)

  it('should render form correctly', () => {
    const { getByText } = renderForm()
    expect(getByText('Contactless Contact')).toBeInTheDocument()
    expect(getByText('Mailing / Billing')).toBeInTheDocument()
  })

  it('should be able to simulate contact', async () => {
    const { getByRole, getByText, findByText } = renderForm()

    expect(getByText('Total: 1')).toBeInTheDocument()

    await userEvent.click(getByRole('button', { name: 'Simulate Inputs' }))

    expect(await findByText('Total: 3')).toBeInTheDocument()
  })
})
