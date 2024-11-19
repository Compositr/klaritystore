import { render } from '@redwoodjs/testing/web'

import AccountLayout from './AccountLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountLayout', () => {
  it('renders successfully', () => {
    window.scrollTo = jest.fn()

    expect(() => {
      render(<AccountLayout />)
    }).not.toThrow()
  })
})
