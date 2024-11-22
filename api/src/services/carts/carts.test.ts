import { carts, cart, createCart } from './carts'
import { type StandardScenario } from './carts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('carts', () => {
  scenario('returns all carts', async (scenario: StandardScenario) => {
    const result = await carts()

    expect(result.length).toEqual(Object.keys(scenario.cart).length)
  })

  scenario('returns a single cart', async (scenario: StandardScenario) => {
    const result = await cart({ idString: scenario.cart.one.idString })

    expect(result).toEqual(scenario.cart.one)
  })

  scenario('creates a cart', async () => {
    const result = await createCart()

    expect(result).toBeTruthy()
  })
})
