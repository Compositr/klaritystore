import type { Product } from '@prisma/client'

import {
  products,
  product,
  createProduct,
  updateProduct,
  deleteProduct,
} from './products'
import type { StandardScenario } from './products.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('products', () => {
  scenario('returns all products', async (scenario: StandardScenario) => {
    const result = await products()

    expect(result.length).toEqual(Object.keys(scenario.product).length)
  })

  scenario('returns a single product', async (scenario: StandardScenario) => {
    const result = await product({ idInt: scenario.product.one.idInt })

    expect(result).toEqual(scenario.product.one)
  })

  scenario('creates a product', async (scenario: StandardScenario) => {
    const result = await createProduct({
      input: {
        name: 'String',
        price: 7361119.00939338,
        description: 'String',
        specifications: 'String',
        categoryId: scenario.product.two.categoryId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.price).toEqual(7361119.00939338)
    expect(result.description).toEqual('String')
    expect(result.specifications).toEqual('String')
    expect(result.categoryId).toEqual(scenario.product.two.categoryId)
  })

  scenario('updates a product', async (scenario: StandardScenario) => {
    const original = (await product({
      idInt: scenario.product.one.idInt,
    })) as Product
    const result = await updateProduct({
      idInt: original.idInt,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a product', async (scenario: StandardScenario) => {
    const original = (await deleteProduct({
      idInt: scenario.product.one.idInt,
    })) as Product
    const result = await product({ idInt: original.idInt })

    expect(result).toEqual(null)
  })
})
