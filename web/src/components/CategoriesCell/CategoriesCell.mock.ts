// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  categories: [
    {
      __typename: 'Category' as const,
      idString: '42',
    },
    {
      __typename: 'Category' as const,
      idString: '43',
    },
    {
      __typename: 'Category' as const,
      idString: '44',
    },
  ],
})
