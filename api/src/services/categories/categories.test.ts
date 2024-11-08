import type { Category } from '@prisma/client'

import {
  categories,
  category,
  createCategory,
  updateCategory,
  deleteCategory,
} from './categories'
import type { StandardScenario } from './categories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('categories', () => {
  scenario('returns all categories', async (scenario: StandardScenario) => {
    const result = await categories()

    expect(result.length).toEqual(Object.keys(scenario.category).length)
  })

  scenario('returns a single category', async (scenario: StandardScenario) => {
    const result = await category({ idString: scenario.category.one.idString })

    expect(result).toEqual(scenario.category.one)
  })

  scenario('creates a category', async () => {
    const result = await createCategory({
      input: { idString: 'String', name: 'String', description: 'String' },
    })

    expect(result.idString).toEqual('String')
    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
  })

  scenario('updates a category', async (scenario: StandardScenario) => {
    const original = (await category({
      idString: scenario.category.one.idString,
    })) as Category
    const result = await updateCategory({
      idString: original.idString,
      input: { idString: 'String3' },
    })

    expect(result.idString).toEqual('String3')
  })

  scenario('deletes a category', async (scenario: StandardScenario) => {
    const original = (await deleteCategory({
      idString: scenario.category.one.idString,
    })) as Category
    const result = await category({ idString: original.idString })

    expect(result).toEqual(null)
  })
})
