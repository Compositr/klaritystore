import { render } from '@redwoodjs/testing/web'

import CategoryPageBreadcrumb from './CategoryPageBreadcrumb'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CategoryPageBreadcrumb', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoryPageBreadcrumb name="Category Test" />)
    }).not.toThrow()
  })
})
