import { render } from '@redwoodjs/testing/web'

import NavHeader from './NavHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavHeader />)
    }).not.toThrow()
  })
})
