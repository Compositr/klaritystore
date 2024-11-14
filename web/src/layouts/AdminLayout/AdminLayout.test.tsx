import { render } from '@redwoodjs/testing/web'

import AdminLayout from './AdminLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminLayout', () => {
  it('renders successfully', () => {
    // Mock window.matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    })
    expect(() => {
      render(<AdminLayout />)
    }).not.toThrow()
  })
})
