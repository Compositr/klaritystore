import type { Prisma, Category } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CategoryCreateArgs>({
  category: {
    one: {
      data: { idString: 'String1', name: 'String', description: 'String' },
    },
    two: {
      data: { idString: 'String2', name: 'String', description: 'String' },
    },
  },
})

export type StandardScenario = ScenarioData<Category, 'category'>
