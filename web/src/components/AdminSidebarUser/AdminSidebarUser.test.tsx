import { render } from '@redwoodjs/testing/web'

import AdminSidebarUser from './AdminSidebarUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminSidebarUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSidebarUser />)
    }).not.toThrow()
  })
})
