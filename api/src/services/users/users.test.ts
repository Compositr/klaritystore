import { me, updateMe } from './users'
import type { StandardScenario } from './users.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns me', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)

    const result = await me()

    expect(result.idString).toEqual(scenario.user.one.idString)
  })

  scenario('updates me', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)

    const result = await updateMe({
      input: { email: 'String' },
    })

    expect(result.email).toEqual('String')
  })
})
