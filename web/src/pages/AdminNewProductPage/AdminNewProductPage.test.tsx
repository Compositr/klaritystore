import { render } from '@redwoodjs/testing/web'

import AdminNewProductPage from './AdminNewProductPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminNewProductPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminNewProductPage />)
    }).not.toThrow()
  })
})
