import { db } from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
  try {
    console.info('\n  Seeding database\n')

    const category = await db.category.create({
      data: {
        idString: 'category-1',
        name: 'Category 1',
        description: 'Description of Category 1',
      },
    })

    await db.product.create({
      data: {
        name: 'Product 1',
        description: 'Description of Product 1',
        specifications: 'Specifications of Product 1',
        price: 100.51,
        categoryId: category.idString,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
