import { render } from '@testing-library/react'
import ContactListForm from '.'
import { Contact } from './types'
import userEvent from '@testing-library/user-event'

describe('ContactListForm Load Test on uncompiled react', () => {
  const renderComponent = (listOfContacts?: Contact[]) =>
    render(
      <ContactListForm listOfContacts={listOfContacts} onSubmit={jest.fn()} />
    )

  const testLoad = 10

  it(`can load ${
    testLoad / 2
  } contacts and not fail within 5 seconds`, async () => {
    const loadTest = testLoad / 2
    const { getByRole, unmount } = renderComponent()

    for (let i = 0; i < loadTest; i++) {
      await userEvent.click(getByRole('button', { name: 'Add' }))
    }

    unmount()
  }, 5000)

  it(`can trigger change of ${
    testLoad * 2
  } fields loaded within 5 seconds`, async () => {
    const loadTest = testLoad * 2
    const initialLoad = []
    for (let index = 0; index < loadTest; index++) {
      initialLoad.push({
        id: `gen-${index}`,
        phoneFor: 'office',
        phoneCode: '60',
        phoneNumber: 1234567,
      })
    }

    const { getAllByLabelText, unmount } = renderComponent(initialLoad)

    await userEvent.type(getAllByLabelText('Phone Number *')[0], '2020201')
    await userEvent.type(
      getAllByLabelText('Phone Number *')[loadTest - 1],
      '2020201'
    )

    unmount()
  }, 5000)
})
