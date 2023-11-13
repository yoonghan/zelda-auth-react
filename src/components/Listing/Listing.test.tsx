import { render } from '@testing-library/react'
import Listing from '.'
import userEvent from '@testing-library/user-event'

describe('Listing', () => {
  const renderComponent = () => {
    const items = [
      { id: 1, value: 'mars' },
      { id: 2, value: 'jupiter' },
      { id: 3, value: 'venus' },
    ]

    const mockAdd = jest.fn()
    const mockRemove = jest.fn()

    const renderResult = render(
      <Listing
        addItem={mockAdd}
        removeItem={mockRemove}
        items={items}
        getIndexKey={(item) => item.id}
        renderItem={(item) => <div>{item.value}</div>}
      />
    )

    return { renderResult, mockAdd, mockRemove }
  }

  it('should render list of items correctly', () => {
    const { renderResult } = renderComponent()

    expect(renderResult.getByText('jupiter')).toBeInTheDocument()
    expect(renderResult.getByText('mars')).toBeInTheDocument()
    expect(renderResult.getByText('venus')).toBeInTheDocument()

    expect(renderResult.getByText('Total: 3')).toBeInTheDocument()
  })

  it('should render add and remove buttons', async () => {
    const { renderResult, mockAdd, mockRemove } = renderComponent()

    await userEvent.click(renderResult.getByRole('button', { name: 'Add' }))
    expect(mockAdd).toHaveBeenCalled()

    await userEvent.click(
      renderResult.getAllByRole('button', { name: 'remove' })[0]
    )
    expect(mockRemove).toHaveBeenCalledWith({ id: 1, value: 'mars' }, 0)
  })
})
