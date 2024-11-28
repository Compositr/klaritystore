export const schema = gql`
  type Category {
    idString: String!
    name: String!
    description: String!
    image: String
    products: [Product]!
    createdAt: DateTime!
  }

  type Query {
    categories: [Category!]! @skipAuth
    category(idString: String!): Category @skipAuth
  }

  input CreateCategoryInput {
    idString: String!
    name: String!
    description: String!
  }

  input UpdateCategoryInput {
    idString: String
    name: String
    description: String
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
      @requireAuth(roles: ["EditStore"])
    updateCategory(idString: String!, input: UpdateCategoryInput!): Category!
      @requireAuth(roles: ["EditStore"])
    deleteCategory(idString: String!): Category!
      @requireAuth(roles: ["EditStore"])
  }
`
