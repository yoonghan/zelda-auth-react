import { render } from '@testing-library/react'
import ContactListForm from '.'
import userEvent from '@testing-library/user-event'
import { Contact } from './types'

describe('ContactListForm', () => {
  const renderComponent = (listOfContacts?: Contact[], onSubmit = jest.fn()) =>
    render(
      <ContactListForm listOfContacts={listOfContacts} onSubmit={onSubmit} />
    )

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
    const onSubmitFn = jest.fn()
    const { getByLabelText, getByRole, findByText, queryByText } =
      renderComponent(undefined, onSubmitFn)
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

    expect(onSubmitFn).toHaveBeenCalled()
  })

  it('can load contacts', () => {
    const { getAllByLabelText } = renderComponent([
      {
        id: 'gen-1',
        phoneFor: 'office',
        phoneCode: '60',
        phoneNumber: 1234567,
      },
      {
        id: 'gen-2',
        phoneFor: 'personal',
        phoneCode: '65',
        phoneNumber: 2345678,
      },
    ])

    const phoneNos = getAllByLabelText('Phone Number *')
    expect(phoneNos[0]).toHaveValue('1234567')
    expect(phoneNos[1]).toHaveValue('2345678')
    expect(phoneNos).toHaveLength(2)
  })
})
