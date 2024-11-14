import { render } from '@redwoodjs/testing/web'

import AdminSidebarNav from './AdminSidebarNav'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminSidebarNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSidebarNav />)
    }).not.toThrow()
  })
})
