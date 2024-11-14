import { render } from '@redwoodjs/testing/web'

import CurrencyFormat from './CurrencyFormat'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CurrencyFormat', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CurrencyFormat value={100} />)
    }).not.toThrow()
  })
})
