import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('should throw when no current user', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, { context: {} })

    expect(mockExecution).toThrow()
  })

  it('should not throw when current user', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {
          email: 'example@example.org',
          firstName: 'Example',
          idString: '42',
          lastName: 'User',
          roles: ['Administrator'],
        },
      },
    })

    expect(mockExecution).not.toThrow()
  })

  it('should throw when current user does not have required role', () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {
          email: 'example@example.org',
          firstName: 'Example',
          idString: '42',
          lastName: 'User',
          roles: ['Customer'],
        },
      },
      directiveArgs: { roles: ['Administrator'] },
    })

    expect(mockExecution).toThrow()
  })
})
