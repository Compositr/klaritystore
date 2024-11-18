import { render } from '@redwoodjs/testing/web'

import AccountBillingPage from './AccountBillingPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountBillingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountBillingPage />)
    }).not.toThrow()
  })
})
