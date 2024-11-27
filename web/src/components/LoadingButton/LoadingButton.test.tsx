import { render, screen } from '@redwoodjs/testing/web'

import LoadingButton from './LoadingButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoadingButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingButton />)
    }).not.toThrow()
  })

  it('renders loading state successfully', () => {
    expect(() => {
      render(<LoadingButton loading />)
    }).not.toThrow()
  })

  it('renders loading message successfully', () => {
    render(<LoadingButton loading />)

    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('renders children successfully', () => {
    expect(() => {
      render(<LoadingButton>children</LoadingButton>)
    }).not.toThrow()
  })

  it('renders loading state with children successfully', () => {
    expect(() => {
      render(<LoadingButton loading>children</LoadingButton>)
    }).not.toThrow()
  })

  it('renders variant successfully', () => {
    expect(() => {
      render(<LoadingButton variant="ghost" />)
    }).not.toThrow()
  })

  it('renders loadingMessage successfully', () => {
    render(<LoadingButton loading loadingMessage="loading message" />)

    expect(screen.getByText('loading message')).toBeInTheDocument()
  })
})
