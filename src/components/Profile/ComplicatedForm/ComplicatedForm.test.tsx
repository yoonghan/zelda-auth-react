import { render, within, waitFor, screen } from '@testing-library/react'
import ComplicatedForm from '.'
import userEvent from '@testing-library/user-event'

describe('ComplicateForm', () => {
  const renderForm = (
    onUpdateUserAdditionalInfo = jest.fn(),
    onGetUserAdditionalInfo = jest.fn()
  ) =>
    render(
      <ComplicatedForm
        onUpdateUserAdditionalInfo={onUpdateUserAdditionalInfo}
        onGetUserAdditionalInfo={onGetUserAdditionalInfo}
      />
    )

  const waitForLoaderToComplete = async () => {
    await waitFor(() => {
      expect(
        screen.queryByTestId('complicatedform-loader')
      ).not.toBeInTheDocument()
    })
  }

  it('should show a loader', () => {
    const onGetUserAdditionalInfo = jest.fn()
    onGetUserAdditionalInfo.mockImplementation(() => new Promise(() => {}))
    const { getByTestId, getByText } = renderForm(
      undefined,
      onGetUserAdditionalInfo
    )
    expect(getByTestId('complicatedform-loader')).toBeInTheDocument()
    expect(
      getByText("You won't see this as it loads very fast.")
    ).toBeInTheDocument()
  })

  it('should render form correctly', async () => {
    const { getByRole } = renderForm()
    await waitForLoaderToComplete()
    expect(
      getByRole('heading', { name: 'Contactless Contact' })
    ).toBeInTheDocument()
    expect(
      getByRole('heading', { name: 'Mailing / Billing' })
    ).toBeInTheDocument()
  })

  it('should trigger onGetUserAdditionalinfo when load', async () => {
    const onGetUserAdditionalInfo = jest.fn()
    onGetUserAdditionalInfo.mockResolvedValue({
      contacts: [
        {
          id: 'gen-1',
          phoneCode: '60',
          phoneFor: 'office',
          phoneNumber: 90873403,
        },
      ],
      mailingAddress: {
        address: '327, Golden Brick Road',
        country: 'SG',
        postalCode: '333888',
      },
    })
    const { getByRole } = renderForm(undefined, onGetUserAdditionalInfo)

    await waitForLoaderToComplete()

    expect(
      getByRole('heading', { name: 'Contactless Contact' })
    ).toBeInTheDocument()
    expect(onGetUserAdditionalInfo).toHaveBeenCalled()
    expect(getByRole('textbox', { name: 'Phone Number' })).toHaveValue(
      '90873403'
    )
    expect(getByRole('textbox', { name: 'Address' })).toHaveValue(
      '327, Golden Brick Road'
    )
  })

  it('should be able save simulate inputs for contacts', async () => {
    const onUpdateUserAdditionalInfoFn = jest.fn()
    const { getByRole } = renderForm(onUpdateUserAdditionalInfoFn)

    await waitForLoaderToComplete()

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

    await waitForLoaderToComplete()

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
