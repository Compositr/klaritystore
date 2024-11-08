import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const categories: QueryResolvers['categories'] = () => {
  return db.category.findMany()
}

export const category: QueryResolvers['category'] = ({ idString }) => {
  return db.category.findUnique({
    where: { idString },
  })
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
  products: (_obj, { root }) => {
    return db.category
      .findUnique({ where: { idString: root?.idString } })
      .products()
  },
}
