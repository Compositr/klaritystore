import type { Prisma, Cart } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CartCreateArgs>({
  cart: {
    one: {
      data: { idString: 'String!', updatedAt: '2024-11-21T23:44:42.052Z' },
    },
    two: {
      data: { idString: 'String2', updatedAt: '2024-11-21T23:44:42.052Z' },
    },
    three: {
      data: {
        idString: 'String3',
        updatedAt: '2024-11-21T23:44:42.052Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Cart, 'cart'>
