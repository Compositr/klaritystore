import { GetCart, GetCartVariables } from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

import useLocalStorage from './useLocalStorage'

const QUERY = gql`
  query GetCart($idString: String!) {
    cart(idString: $idString) {
      idString
      items {
        quantity
        product {
          idInt
          name
          price
        }
      }
    }
  }
`

const useCart = () => {
  const [cartId] = useLocalStorage('cartId', '')

  const { data } = useQuery<GetCart, GetCartVariables>(QUERY, {
    variables: {
      idString: cartId,
    },
  })

  return data?.cart
}

export default useCart
