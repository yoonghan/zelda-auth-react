import { render } from '@testing-library/react'
import TestField from '.'

describe('TestField', () => {
  it('should prove that unmount will help isValid not throwing warning', async () => {
    const { getByLabelText, unmount } = render(<TestField value={123} />)
    expect(getByLabelText('Phone Number *')).toBeInTheDocument()
    unmount()
  })
})
