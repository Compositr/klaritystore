import { render } from '@redwoodjs/testing/web'

import AdminSidebarSecondaryNav from './AdminSidebarSecondaryNav'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminSidebarSecondaryNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSidebarSecondaryNav />)
    }).not.toThrow()
  })
})
