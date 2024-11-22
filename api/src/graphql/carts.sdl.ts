export const schema = gql`
  type Cart {
    idString: String!
    user: User
    userId: String
    items: [CartItem]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    carts: [Cart!]! @requireAuth(roles: ["Employee"])
    cart(idString: String!): Cart @skipAuth
    myCart: Cart @requireAuth
  }

  type Mutation {
    createCart: Cart! @skipAuth
  }
`
