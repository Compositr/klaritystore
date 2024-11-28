import { render } from '@redwoodjs/testing/web'

import CheckoutForm from './CheckoutForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CheckoutForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckoutForm />)
    }).not.toThrow()
  })
})
