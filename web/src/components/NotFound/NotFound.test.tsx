import { render } from '@redwoodjs/testing/web'

import NotFound from './NotFound'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NotFound', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NotFound />)
    }).not.toThrow()
  })
})
