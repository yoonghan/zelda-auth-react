import { render } from '@testing-library/react'
import ContactListForm from '.'
import userEvent from '@testing-library/user-event'

describe('ContactListForm', () => {
  const renderComponent = () => render(<ContactListForm />)

  it('should render non-empty list', () => {
    const { getByLabelText } = renderComponent()
    expect(getByLabelText('Phone Number *')).toBeInTheDocument()
  })

  it('should add component and remove when add it pressed followed by remove', async () => {
    const { getByRole, getAllByRole } = renderComponent()
    await userEvent.click(getByRole('button', { name: 'Add' }))
    expect(getAllByRole('button', { name: 'remove' })).toHaveLength(2)
    await userEvent.click(getAllByRole('button', { name: 'remove' })[0])
    expect(getAllByRole('button', { name: 'remove' })).toHaveLength(1)
  })

  it('should show exception when there is error', async () => {
    const { getByRole, getByText } = renderComponent()
    await userEvent.click(getByRole('button', { name: 'Save Contacts' }))
    expect(getByText('Form contains error.')).toBeInTheDocument()
  })

  it('should be able to submit', async () => {
    const { getByLabelText, getByRole, findByText, queryByText } =
      renderComponent()
    await userEvent.type(getByLabelText('Phone Number *'), '12345678')
    await userEvent.click(getByRole('button', { name: 'Save Contacts' }))
    expect(await findByText('Saving information')).toBeVisible()
    expect(
      getByRole('row', { name: 'Phone For Phone Number' })
    ).toBeInTheDocument()
    expect(
      getByRole('row', { name: 'office (65) - 12345678' })
    ).toBeInTheDocument()
    await userEvent.click(getByRole('button', { name: 'Close' }))
    expect(queryByText('Saving information')).not.toBeVisible()
  })
})
