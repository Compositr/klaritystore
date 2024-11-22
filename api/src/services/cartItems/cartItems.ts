import type {
  MutationResolvers,
  CartItemRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const createCartItem: MutationResolvers['createCartItem'] = async ({
  input,
}) => {
  validate(input.quantity, {
    numericality: {
      message: 'Quantity must be a positive integer',
      positive: true,
      integer: true,
    },
  })

  const product = await db.product.findUnique({
    where: { idInt: input.productId },
  })

  if (!product) throw new ValidationError('Product ID invalid')

  const cart = await db.cart.findUnique({
    where: { idString: input.cartId },
    include: {
      items: {
        select: { productId: true },
      },
    },
  })

  if (!cart) throw new ValidationError('Cart ID invalid')
  if (cart.userId && cart.userId !== context.currentUser?.idString)
    throw new ForbiddenError('User does not have access to this cart')

  if (cart.items.some((item) => item.productId === input.productId))
    throw new ValidationError(
      'Product already in cart. Use updateCartItem to edit quantity'
    )

  return db.cartItem.create({
    data: {
      productId: input.productId,
      cartId: input.cartId,
      quantity: input.quantity,
    },
  })
}

export const updateCartItem: MutationResolvers['updateCartItem'] = async ({
  cartId,
  productId,
  input,
}) => {
  validate(input.quantity, {
    numericality: {
      // 0 is equivalent to removing the item from the cart
      message: 'Quantity must be a positive integer or 0',
      integer: true,
      greaterThanOrEqual: 0,
    },
  })

  const cart = await db.cart.findUnique({
    where: { idString: cartId },
  })

  if (!cart) throw new ValidationError('Cart ID invalid')
  if (cart.userId && cart.userId !== context.currentUser?.idString)
    throw new ForbiddenError('User does not have access to this cart')

  const cartItem = await db.cartItem.findUnique({
    where: { productId_cartId: { productId, cartId } },
  })

  if (!cartItem) throw new ValidationError('Product not found in that cart')

  if (input.quantity === 0) {
    return db.cartItem.delete({
      where: { productId_cartId: { productId, cartId } },
    })
  }

  return db.cartItem.update({
    where: { productId_cartId: { productId, cartId } },
    data: { quantity: input.quantity },
  })
}

export const deleteCartItem: MutationResolvers['deleteCartItem'] = async ({
  cartId,
  productId,
}) => {
  const cart = await db.cart.findUnique({
    where: { idString: cartId },
    include: {
      items: {
        select: { productId: true },
      },
    },
  })

  if (!cart) throw new ValidationError('Cart ID invalid')
  if (cart.userId && cart.userId !== context.currentUser?.idString)
    throw new ForbiddenError('User does not have access to this cart')

  if (!cart.items.some((item) => item.productId === productId))
    throw new ValidationError('Product not found in that cart')

  return db.cartItem.delete({
    where: { productId_cartId: { productId, cartId } },
  })
}

export const CartItems: CartItemRelationResolvers = {
  cart: (_obj, { root }) => {
    return db.cartItem
      .findUnique({
        where: {
          productId_cartId: {
            cartId: root?.cartId,
            productId: root?.productId,
          },
        },
      })
      .cart()
  },
  product: (_obj, { root }) => {
    return db.cartItem
      .findUnique({
        where: {
          productId_cartId: {
            cartId: root?.cartId,
            productId: root?.productId,
          },
        },
      })
      .product()
  },
}
