import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const categories: QueryResolvers['categories'] = () => {
  return db.category.findMany()
}

export const category: QueryResolvers['category'] = async ({ idString }) => {
  const category = await db.category.findUnique({
    where: { idString },
  })

  return category?.withSignedUrl()
}

export const createCategory: MutationResolvers['createCategory'] = ({
  input,
}) => {
  return db.category.create({
    data: input,
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = ({
  idString,
  input,
}) => {
  return db.category.update({
    data: input,
    where: { idString },
  })
}

export const deleteCategory: MutationResolvers['deleteCategory'] = ({
  idString,
}) => {
  return db.category.delete({
    where: { idString },
  })
}

export const Category: CategoryRelationResolvers = {
  products: async (_obj, { root }) => {
    const products = await db.product.findMany({
      where: { categoryId: root.idString },
    })

    return products?.map((p) => p?.withSignedUrl())
  },
}
