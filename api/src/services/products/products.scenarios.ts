import type { Prisma, Product } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProductCreateArgs>({
  product: {
    one: {
      data: {
        name: 'String',
        price: 3234982.9053899515,
        description: 'String',
        specifications: 'String',
        updatedAt: '2024-11-08T09:59:24.236Z',
        category: {
          create: {
            idString: 'String0',
            name: 'String',
            description: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        price: 1257284.1049253137,
        description: 'String',
        specifications: 'String',
        updatedAt: '2024-11-08T09:59:24.236Z',
        category: {
          create: {
            idString: 'String-1',
            name: 'String',
            description: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Product, 'product'>
