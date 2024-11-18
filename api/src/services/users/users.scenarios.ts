import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String452124',
        firstName: 'String',
        lastName: 'String',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-18T05:53:23.781Z',
      },
    },
    two: {
      data: {
        email: 'String3535558',
        firstName: 'String',
        lastName: 'String',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-18T05:53:23.781Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
