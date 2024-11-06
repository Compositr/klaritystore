import { render } from '@redwoodjs/testing/web'

import StoreLayout from './StoreLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StoreLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoreLayout />)
    }).not.toThrow()
  })
})
