// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  orders: [
    {
      __typename: 'Order' as const,
      idString: '42',
    },
    {
      __typename: 'Order' as const,
      idString: '43',
    },
    {
      __typename: 'Order' as const,
      idString: '44',
    },
  ],
})
