import { render } from '@redwoodjs/testing/web'

import VisitorChart from './VisitorChart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('VisitorChart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VisitorChart />)
    }).not.toThrow()
  })
})
