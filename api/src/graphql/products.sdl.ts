export const schema = gql`
  type Product {
    idInt: Int!
    name: String!
    price: Float!
    description: String!
    specifications: String!
    category: Category!
    categoryId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    products: [Product!]! @skipAuth
    product(idInt: Int!): Product @skipAuth
  }

  input CreateProductInput {
    name: String!
    price: Float!
    description: String!
    specifications: String!
    categoryId: String!
  }

  input UpdateProductInput {
    name: String
    price: Float
    description: String
    specifications: String
    categoryId: String
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
      @requireAuth(roles: ["EditStore"])
    updateProduct(idInt: Int!, input: UpdateProductInput!): Product!
      @requireAuth(roles: ["EditStore"])
    deleteProduct(idInt: Int!): Product! @requireAuth(roles: ["EditStore"])
  }
`
