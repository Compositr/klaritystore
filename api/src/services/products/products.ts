import type {
  QueryResolvers,
  MutationResolvers,
  ProductRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { saveFiles } from 'src/lib/uploads'

export const products: QueryResolvers['products'] = () => {
  return db.product.findMany()
}

export const product: QueryResolvers['product'] = async ({ idInt }) => {
  const product = await db.product.findUnique({
    where: { idInt },
  })

  return product.withSignedUrl()
}

export const createProduct: MutationResolvers['createProduct'] = async ({
  input,
}) => {
  const processed = await saveFiles.forProduct(input)

  return db.product.create({
    data: processed,
  })
}

export const updateProduct: MutationResolvers['updateProduct'] = async ({
  idInt,
  input,
}) => {
  const processed = await saveFiles.forProduct(input)

  return db.product.update({
    data: processed,
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
