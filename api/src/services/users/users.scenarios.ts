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
    three: {
      data: {
        email: 'example@example.org',
        firstName: 'EdExample',
        lastName: 'Userton',
        hashedPassword:
          // Password: 'password'
          '8dee09cdf641d21ccb01e1e38279881055ee939ad830de045f719eff1d0c6778|16384|8|1',
        salt: '3e85c4f5a9f40cc762bef6e5808c060464a1d72e86b3d7c99867b51ee135406b',
        updatedAt: '2024-11-18T05:53:23.781Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
