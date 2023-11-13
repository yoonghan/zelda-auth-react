import { render } from '@testing-library/react'
import ComplicatedForm from '.'

describe('ComplicateForm', () => {
  const renderForm = () => render(<ComplicatedForm />)

  it('should render form correctly', () => {
    const { getByText } = renderForm()
  })
})
