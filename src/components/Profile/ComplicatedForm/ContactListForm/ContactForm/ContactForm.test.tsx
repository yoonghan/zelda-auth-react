import { render } from '@testing-library/react'
import ComponentForm from '.'
import userEvent from '@testing-library/user-event'

describe('ContactForm', () => {
  const renderComponent = (
    changeCallback = jest.fn(),
    changeIsValid = jest.fn()
  ) =>
    render(
      <ComponentForm
        id="0"
        phoneCode="65"
        phoneNumber={undefined}
        phoneFor="office"
        changeCallback={changeCallback}
        changeIsValid={changeIsValid}
      />
    )

  it('should render component correctly', () => {
    const { getByLabelText } = renderComponent()
    expect(getByLabelText('Phone For *')).toBeInTheDocument()
    expect(getByLabelText('Country *')).toBeInTheDocument()
    expect(getByLabelText('Phone Number *')).toBeInTheDocument()
  })

  it('should validate phone number', async () => {
    const dataDirtyChangeFn = jest.fn()
    const { getByLabelText, getByText } = renderComponent(
      jest.fn(),
      dataDirtyChangeFn
    )
    const phoneNumberComponent = getByLabelText('Phone Number *')
    await userEvent.clear(getByLabelText('Phone Number *'))
    await userEvent.tab()
    expect(getByText('Phone number is required.'))
    await userEvent.type(phoneNumberComponent, '9999')
    await userEvent.tab()
    expect(getByText('Phone number is at least 7 in length.'))
    await userEvent.type(phoneNumberComponent, '99999999')
    await userEvent.tab()
    expect(getByText('Phone number is at most 10 in length.'))
    await userEvent.clear(phoneNumberComponent)
    await userEvent.type(phoneNumberComponent, 'AAAAAAA')
    await userEvent.tab()
    expect(getByText('Phone number is invalid, allowed only (0-9).'))
    expect(dataDirtyChangeFn).toHaveBeenCalled()
  })

  it('should trigger change-callback to field changed', async () => {
    const changeCallbackFn = jest.fn()
    const { getByLabelText } = renderComponent(changeCallbackFn)

    await userEvent.type(getByLabelText('Phone Number *'), '9')

    expect(changeCallbackFn).toHaveBeenCalledWith('phoneNumber-0', {
      'phoneCode-0': '65',
      'phoneFor-0': 'office',
      'phoneNumber-0': '9',
    })
  })
})
