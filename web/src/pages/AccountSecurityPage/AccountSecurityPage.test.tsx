import { render } from '@redwoodjs/testing/web'

import AccountSecurityPage from './AccountSecurityPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountSecurityPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountSecurityPage />)
    }).not.toThrow()
  })
})
