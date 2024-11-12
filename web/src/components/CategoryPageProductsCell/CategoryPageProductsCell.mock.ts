// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  category: {
    idString: 'mock-idString',
    name: 'mock-name',
    description: 'mock-description',
    products: [
      {
        idInt: 1,
        price: 1,
      },
      {
        idInt: 2,
        price: 2,
      },
    ],
  },
})
