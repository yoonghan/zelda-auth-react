import { render, within } from '@testing-library/react'
import ComplicatedForm from '.'
import userEvent from '@testing-library/user-event'

describe('ComplicateForm', () => {
  const renderForm = () => render(<ComplicatedForm />)

  it('should render form correctly', () => {
    const { getByRole } = renderForm()
    expect(
      getByRole('heading', { name: 'Contactless Contact' })
    ).toBeInTheDocument()
    expect(
      getByRole('heading', { name: 'Mailing / Billing' })
    ).toBeInTheDocument()
  })

  it('should be able to simulate inputs', async () => {
    const { getByRole } = renderForm()
    const contactBox = getByRole('heading', { name: 'Contactless Contact' })
      .parentElement.parentElement.parentElement
    const mailingBox = getByRole('heading', { name: 'Mailing / Billing' })
      .parentElement.parentElement.parentElement

    expect(within(contactBox).getByText('Total: 1')).toBeInTheDocument()
    expect(
      within(mailingBox).getByRole('button', { name: 'Country Malaysia' })
    ).toBeInTheDocument()

    await userEvent.click(getByRole('button', { name: 'Simulate Inputs' }))
    expect(await within(contactBox).findByText('Total: 3')).toBeInTheDocument()
    expect(
      within(mailingBox).getByRole('textbox', { name: 'Address' })
    ).toHaveValue('327, Golden Brick Road')
    expect(
      within(mailingBox).getByRole('spinbutton', { name: 'Postal Code' })
    ).toHaveValue(333888)
    expect(
      within(mailingBox).getByRole('button', { name: 'Country Singapore' })
    ).toBeInTheDocument()
  })
})
