import { render } from '@testing-library/react'
import MailForm from '.'
import userEvent from '@testing-library/user-event'

describe('MailForm', () => {
  const renderComponent = (
    props?: {
      address: string
      postalCode: string
      country: string
    },
    onSubmit = jest.fn()
  ) =>
    render(
      <MailForm
        address={props?.address}
        postalCode={props?.postalCode}
        country={props?.country}
        onSubmit={onSubmit}
      />
    )

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
    const onSubmitFn = jest.fn()
    const { getByRole, getByText, queryByText, getByLabelText, findByText } =
      renderComponent(undefined, onSubmitFn)
    await userEvent.type(getByLabelText('Address *'), '48, Road Avenue')
    await userEvent.type(getByLabelText('Postal Code *'), '48100')
    await userEvent.click(getByRole('button', { name: 'Save Mailing Address' }))
    expect(await findByText('Information Saved')).toBeVisible()
    expect(getByText('48, Road Avenue')).toBeInTheDocument()
    expect(getByText('48100 Malaysia')).toBeInTheDocument()
    await userEvent.click(getByRole('button', { name: 'Close' }))
    expect(queryByText('Information Saved')).not.toBeVisible()

    expect(onSubmitFn).toHaveBeenCalled()
  })

  it('should be able to submit and pop a message', async () => {
    const { getByRole, findByText, getByText } = renderComponent({
      address: '34, A road',
      postalCode: '24000',
      country: 'SG',
    })

    expect(
      getByRole('button', { name: 'Save Mailing Address' })
    ).toBeInTheDocument()

    await userEvent.click(getByRole('button', { name: 'Save Mailing Address' }))
    expect(await findByText('Information Saved')).toBeVisible()
    expect(getByText('34, A road')).toBeInTheDocument()
    expect(getByText('24000 Singapore')).toBeInTheDocument()
  })
})
