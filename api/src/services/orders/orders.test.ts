import type { Order } from '@prisma/client'

import { orders, order, createOrder, updateOrder, deleteOrder } from './orders'
import type { StandardScenario } from './orders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orders', () => {
  scenario('returns all orders', async (scenario: StandardScenario) => {
    const result = await orders()

    expect(result.length).toEqual(Object.keys(scenario.order).length)
  })

  scenario('returns a single order', async (scenario: StandardScenario) => {
    const result = await order({ idString: scenario.order.one.idString })

    expect(result).toEqual(scenario.order.one)
  })

  scenario('creates a order', async () => {
    const result = await createOrder({
      input: { idString: 'String' },
    })

    expect(result.idString).toEqual('String')
  })

  scenario('updates a order', async (scenario: StandardScenario) => {
    const original = (await order({
      idString: scenario.order.one.idString,
    })) as Order
    const result = await updateOrder({
      idString: original.idString,
      input: { idString: 'String2' },
    })

    expect(result.idString).toEqual('String2')
  })

  scenario('deletes a order', async (scenario: StandardScenario) => {
    const original = (await deleteOrder({
      idString: scenario.order.one.idString,
    })) as Order
    const result = await order({ idString: original.idString })

    expect(result).toEqual(null)
  })
})
