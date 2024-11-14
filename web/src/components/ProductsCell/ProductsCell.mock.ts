// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  products: [
    {
      __typename: 'Product' as const,
      idInt: 42,
      name: 'Product 42',
      description: 'This is product 42',
      price: 42.42,
      category: {
        __typename: 'Category' as const,
        idString: '42',
        name: 'Category 42',
      },
    },
    {
      __typename: 'Product' as const,
      idInt: 43,
      name: 'Product 43',
      description: 'This is product 43',
      price: 43.43,
      category: {
        __typename: 'Category' as const,
        idString: '43',
        name: 'Category 43',
      },
    },
    {
      __typename: 'Product' as const,
      idInt: 44,
      name: 'Product 44',
      description: 'This is product 44',
      price: 44.44,
      category: {
        __typename: 'Category' as const,
        idString: '44',
        name: 'Category 44',
      },
    },
  ],
})
