import { createId } from '@paralleldrive/cuid2'
import type {
  QueryResolvers,
  MutationResolvers,
  CartRelationResolvers,
  CartItemRelationResolvers,
} from 'types/graphql'

import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const carts: QueryResolvers['carts'] = () => {
  return db.cart.findMany()
}

export const cart: QueryResolvers['cart'] = async ({ idString }) => {
  const cart = await db.cart.findUnique({
    where: { idString },
  })

  if (cart?.userId && cart.userId !== context.currentUser?.idString) {
    throw new ForbiddenError('User does not have access to this cart')
  }

  return cart
}

export const myCart: QueryResolvers['myCart'] = async () => {
  return db.cart.findFirst({
    where: { userId: context.currentUser?.idString },
  })
}

export const createCart: MutationResolvers['createCart'] = async () => {
  if (context.currentUser) {
    // Check for existing cart: if the user already has a cart throw
    const existingCart = await db.cart.findFirst({
      where: { userId: context.currentUser.idString },
    })

    if (existingCart) {
      throw new ValidationError('User already has a cart')
    }
  }

  return db.cart.create({
    data: {
      idString: createId(),
      userId: context.currentUser?.idString,
    },
  })
}

export const Cart: CartRelationResolvers = {
  user: (_obj, { root }) => {
    return db.cart.findUnique({ where: { idString: root?.idString } }).user()
  },
  items: (_obj, { root }) => {
    return db.cart.findUnique({ where: { idString: root?.idString } }).items()
  },
}

export const CartItem: CartItemRelationResolvers = {
  product: async (_obj, { root }) => {
    const product = await db.product.findUnique({
      where: {
        idInt: root?.productId,
      },
    })

    return product?.withSignedUrl()
  },
}
