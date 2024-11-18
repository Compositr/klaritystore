export const schema = gql`
  type User {
    idString: String!
    email: String!
    firstName: String!
    lastName: String!
    roles: [Role]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Role {
    Administrator
    Manager
    Employee
    Customer
  }

  type Query {
    me: User @requireAuth
  }

  # TODO: Administrator user changes
  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
  }

  type Mutation {
    updateMe(input: UpdateUserInput!): User! @requireAuth
  }
`
