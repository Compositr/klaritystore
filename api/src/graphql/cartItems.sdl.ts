export const schema = gql`
  type CartItem {
    cart: Cart!
    cartId: String!
    product: Product!
    productId: Int!
    quantity: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # No queries - Please fetch from carts.sdl

  input CreateCartItemInput {
    cartId: String!
    productId: Int!
    quantity: Int!
  }

  input UpdateCartItemInput {
    # 0 is equivalent to removing the item from the cart
    quantity: Int!
  }

  type Mutation {
    createCartItem(input: CreateCartItemInput!): CartItem! @skipAuth
    updateCartItem(
      cartId: String!
      productId: Int!
      input: UpdateCartItemInput!
    ): CartItem! @skipAuth
    deleteCartItem(cartId: String!, productId: Int!): CartItem! @skipAuth
  }
`
