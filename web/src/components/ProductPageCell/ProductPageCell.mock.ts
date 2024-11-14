// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  productPage: {
    __typename: 'ProductPage' as const,
    id: 42,
  },
})
