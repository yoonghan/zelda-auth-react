import { render } from '@testing-library/react'
import TestField from '.'

describe('TestField', () => {
  it('should render ', () => {
    const { getByLabelText } = render(<TestField value={123}/>)
    expect(getByLabelText('Phone Number *')).toBeInTheDocument()
  })
})
