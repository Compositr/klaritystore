import type {
  QueryResolvers,
  MutationResolvers,
  ProductRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const products: QueryResolvers['products'] = () => {
  return db.product.findMany()
}

export const product: QueryResolvers['product'] = ({ idInt }) => {
  return db.product.findUnique({
    where: { idInt },
  })
}

export const createProduct: MutationResolvers['createProduct'] = ({
  input,
}) => {
  return db.product.create({
    data: input,
  })
}

export const updateProduct: MutationResolvers['updateProduct'] = ({
  idInt,
  input,
}) => {
  return db.product.update({
    data: input,
    where: { idInt },
  })
}

export const deleteProduct: MutationResolvers['deleteProduct'] = ({
  idInt,
}) => {
  return db.product.delete({
    where: { idInt },
  })
}

export const Product: ProductRelationResolvers = {
  category: (_obj, { root }) => {
    return db.product.findUnique({ where: { idInt: root?.idInt } }).category()
  },
}
