import { render } from '@redwoodjs/testing/web'

import ProductCard from './ProductCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProductCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ProductCard
          product={{
            idInt: 1,
            name: 'Product 1',
            price: 100,
          }}
        />
      )
    }).not.toThrow()
  })
})
