import { createId } from '@paralleldrive/cuid2'
import type {
  QueryResolvers,
  MutationResolvers,
  OrderRelationResolvers,
  OrderItemRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const orders: QueryResolvers['orders'] = () => {
  return db.order.findMany()
}

export const order: QueryResolvers['order'] = async ({ idString }) => {
  const order = await db.order.findUnique({
    where: { idString },
  })

  if (order?.userId && order.userId !== context.currentUser?.idString) {
    throw new ForbiddenError('User does not have access to this order')
  }

  return order
}

export const createOrder: MutationResolvers['createOrder'] = async ({
  cartId,
  input,
}) => {
  validate(input.email, {
    email: {
      message: 'Invalid email address',
    },
  })

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

  const tx = await db.$transaction([
    db.order.create({
      data: {
        idString: createId(),
        userId: context.currentUser?.idString,
        items: {
          create: cart.items.map((item) => ({
            product: { connect: { idInt: item.productId } },
            quantity: 1,
          })),
        },

        email: input.email,
        shippingFirst: input.shippingFirst,
        shippingLast: input.shippingLast,
        shippingAddress: input.shippingAddress,
        shippingAddressLine2: input.shippingAddressLine2,
      },
    }),
    db.cart.delete({
      where: { idString: cartId },
    }),
  ])

  return tx[0]
}

export const deleteOrder: MutationResolvers['deleteOrder'] = ({ idString }) => {
  return db.order.delete({
    where: { idString },
  })
}

export const Order: OrderRelationResolvers = {
  user: (_obj, { root }) => {
    return db.order.findUnique({ where: { idString: root?.idString } }).user()
  },
  items: (_obj, { root }) => {
    return db.order.findUnique({ where: { idString: root?.idString } }).items()
  },
}

export const OrderItem: OrderItemRelationResolvers = {
  product: (_obj, { root }) => {
    return db.product.findUnique({ where: { idInt: root.productId } })
  },
}
