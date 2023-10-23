import { render, screen, within } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('should render correctly', () => {
    render(<About />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(
      screen.getByText('This site is used for user up-keep and authentication.')
    ).toBeInTheDocument()
  })

  it('should reflect the latest version', () => {
    render(<About />)
    const version = screen.getByText('Version')
    expect(within(version).getByText('1.0.0')).toBeInTheDocument()
  })
})
