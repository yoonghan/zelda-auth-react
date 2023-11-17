import { render, within } from '@testing-library/react'
import ComplicatedForm from '.'
import userEvent from '@testing-library/user-event'

describe('ComplicateForm', () => {
  const renderForm = (onUpdateUserAdditionalInfo = jest.fn()) =>
    render(
      <ComplicatedForm
        onUpdateUserAdditionalInfo={onUpdateUserAdditionalInfo}
      />
    )

  it('should render form correctly', () => {
    const { getByRole } = renderForm()
    expect(
      getByRole('heading', { name: 'Contactless Contact' })
    ).toBeInTheDocument()
    expect(
      getByRole('heading', { name: 'Mailing / Billing' })
    ).toBeInTheDocument()
  })

  it('should be able save simulate inputs for contacts', async () => {
    const onUpdateUserAdditionalInfoFn = jest.fn()
    const { getByRole } = renderForm(onUpdateUserAdditionalInfoFn)

    const contactBox = getByRole('heading', { name: 'Contactless Contact' })
      .parentElement.parentElement.parentElement

    await userEvent.click(getByRole('button', { name: 'Simulate Inputs' }))
    expect(await within(contactBox).findByText('Total: 3')).toBeInTheDocument()

    await userEvent.click(getByRole('button', { name: 'Save Contacts' }))
    expect(onUpdateUserAdditionalInfoFn).toHaveBeenCalledWith({
      contacts: [
        {
          id: 'gen-1',
          phoneCode: '60',
          phoneFor: 'office',
          phoneNumber: 90873403,
        },
        {
          id: 'gen-2',
          phoneCode: '65',
          phoneFor: 'personal',
          phoneNumber: 1234567,
        },
        {
          id: 'gen-3',
          phoneCode: '60',
          phoneFor: 'home',
          phoneNumber: 80239231,
        },
      ],
    })
    await userEvent.click(getByRole('button', { name: 'Close' }))
  })

  it('should be able save simulate inputs for address', async () => {
    const onUpdateUserAdditionalInfoFn = jest.fn()
    const { getByRole } = renderForm(onUpdateUserAdditionalInfoFn)

    const mailingBox = getByRole('heading', { name: 'Mailing / Billing' })
      .parentElement.parentElement.parentElement

    await userEvent.click(getByRole('button', { name: 'Simulate Inputs' }))
    expect(
      within(mailingBox).getByRole('button', { name: 'Country Singapore' })
    ).toBeInTheDocument()

    await userEvent.click(getByRole('button', { name: 'Save Mailing Address' }))
    expect(onUpdateUserAdditionalInfoFn).toHaveBeenCalledWith({
      mailingAddress: {
        address: '327, Golden Brick Road',
        country: 'SG',
        postalCode: '333888',
      },
    })
    await userEvent.click(getByRole('button', { name: 'Close' }))
  })
})
