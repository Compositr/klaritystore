// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  navLinks: [
    {
      __typename: 'NavLinks' as const,
      id: 42,
    },
    {
      __typename: 'NavLinks' as const,
      id: 43,
    },
    {
      __typename: 'NavLinks' as const,
      id: 44,
    },
  ],
})
