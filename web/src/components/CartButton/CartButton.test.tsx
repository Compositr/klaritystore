import { render } from '@redwoodjs/testing/web'

import CartButton from './CartButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CartButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CartButton />)
    }).not.toThrow()
  })
})
