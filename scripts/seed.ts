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

    const diaries = await db.category.create({
      data: {
        idString: 'diaries',
        name: 'Diaries',
        description: 'Diaries and planners for your daily needs',
      },
    })

    const notepads = await db.category.create({
      data: {
        idString: 'notepads',
        name: 'Notepads',
        description: 'Notepads for jotting down your thoughts',
      },
    })

    const pensAndPencils = await db.category.create({
      data: {
        idString: 'pens-and-pencils',
        name: 'Pens and Pencils',
        description: 'Pens and pencils for your writing needs',
      },
    })

    await db.product.createMany({
      data: new Array(30).fill(null).map((_, i) => ({
        name: `Diary #${i + 1}`,
        description: `Description of Product ${i + 1}`,
        specifications: `Specifications of Product ${i + 1}`,
        price: 100 + i * 10,
        categoryId: diaries.idString,
      })),
    })

    await db.product.createMany({
      data: new Array(30).fill(null).map((_, i) => ({
        name: `Notepad #${i + 1}`,
        description: `Description of Product ${i + 1}`,
        specifications: `Specifications of Product ${i + 1}`,
        price: 100 + i * 10,
        categoryId: notepads.idString,
      })),
    })

    await db.product.createMany({
      data: new Array(30).fill(null).map((_, i) => ({
        name: `Pen #${i + 1}`,
        description: `Description of Product ${i + 1}`,
        specifications: `Specifications of Product ${i + 1}`,
        price: 100 + i * 10,
        categoryId: pensAndPencils.idString,
      })),
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
        roles: ['Administrator', 'Employee'],
      },
    })

    await db.user.create({
      data: {
        email: 'customer@example.org',
        firstName: 'Customer',
        lastName: 'Lastname',
        // Password: 'password'
        hashedPassword:
          '8dee09cdf641d21ccb01e1e38279881055ee939ad830de045f719eff1d0c6778|16384|8|1',
        salt: '3e85c4f5a9f40cc762bef6e5808c060464a1d72e86b3d7c99867b51ee135406b',
        roles: ['Customer'],
      },
    })
  } catch (error) {
    console.error(error)
  }
}
