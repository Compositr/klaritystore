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

    await db.user.create({
      data: {
        email: 'johndoe@example.org',
        firstName: 'John',
        lastName: 'Doe',
        // Password: 'password'
        hashedPassword:
          '8dee09cdf641d21ccb01e1e38279881055ee939ad830de045f719eff1d0c6778|16384|8|1',
        salt: '3e85c4f5a9f40cc762bef6e5808c060464a1d72e86b3d7c99867b51ee135406b',
        roles: ['Administrator'],
      },
    })
  } catch (error) {
    console.error(error)
  }
}
