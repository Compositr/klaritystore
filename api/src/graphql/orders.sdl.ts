export const schema = gql`
  type Order {
    idString: String!
    user: User
    userId: String
    items: [OrderItem]!

    email: String!
    shippingFirst: String!
    shippingLast: String!
    shippingAddress: String!
    shippingAddressLine2: String
  }

  type OrderItem {
    productId: Int!
    product: Product!

    orderId: String!
    order: Order!

    quantity: Int!
  }

  type Query {
    orders: [Order]! @requireAuth(roles: ["Employee"])
    order(idString: String!): Order @skipAuth
    myOrders: [Order]! @requireAuth
  }

  input CreateOrderInput {
    email: String!
    shippingFirst: String!
    shippingLast: String!
    shippingAddress: String!
    shippingAddressLine2: String
  }

  type Mutation {
    # Orders are immutable once created
    # Orders may only created from carts
    createOrder(cartId: String!, input: CreateOrderInput): Order! @skipAuth
    deleteOrder(idString: String!): Order! @requireAuth(roles: ["Employee"])
  }
`
