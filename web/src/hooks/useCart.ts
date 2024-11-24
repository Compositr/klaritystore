import { useEffect } from 'react'

import {
  AddToCart,
  AddToCartVariables,
  CreateCart,
  CreateCartVariables,
  GetCart,
  GetCartVariables,
} from 'types/graphql'

import { useMutation, useQuery } from '@redwoodjs/web'

import useLocalStorage from './useLocalStorage'

// TODO: Handle myCart query
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

    myCart {
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

const NEW_CART_MUTATION = gql`
  mutation CreateCart {
    createCart {
      idString
    }
  }
`

const ADD_MUTATION = gql`
  mutation AddToCart($cartId: String!, $productId: Int!, $quantity: Int!) {
    createCartItem(
      input: { cartId: $cartId, productId: $productId, quantity: $quantity }
    ) {
      cart {
        idString
      }
      product {
        idInt
      }
      quantity
    }
  }
`

/**
 * Tuple describing the return type for the useCart hook
 *
 * [0] - The cart data (may be nullish)
 *
 * [1] - An object with various helper functions and state
 *  - loading: A boolean indicating if any mutation or query is in progress
 *  - addToCart: A function to add a product to the cart (provide productId int and optional quantity int)
 *  - addToCartState: The state of the addToCart mutation operation
 */
export type UseCart = [
  GetCart['cart'],
  {
    loading: boolean

    addToCart: (productId: number, quantity?: number) => void
    addToCartState: MutationOperationResult<AddToCart, AddToCartVariables>['1']
  },
]

/**
 * A hook for interacting with the user's cart
 *
 * @returns A tuple the cart data and an object with various helper functions and state. See {@link UseCart}
 */
const useCart = (): UseCart => {
  const [storedCartId, setStoredCartId] = useLocalStorage('cartId', '')

  const {
    data,
    loading: queryLoading,
    client,
  } = useQuery<GetCart, GetCartVariables>(QUERY, {
    variables: {
      idString: storedCartId,
    },
  })

  // React to changes in the cart data (e.g. we added an item)
  function reactToChanges() {
    client.refetchQueries({
      include: ['myCart', 'cart'],
    })
  }

  const [createCart, createCartState] = useMutation<
    CreateCart,
    CreateCartVariables
  >(NEW_CART_MUTATION, {
    onCompleted: reactToChanges,
  })

  React.useEffect(() => {
    // Wait until query is no longer loading
    if (queryLoading) return

    console.log('queryLoading', queryLoading)
    console.log('storedCart', storedCartId)
    console.log(data)

    // Create cart if no cart exists
    if (!storedCartId && !data?.myCart) {
      createCart().then((res) => setStoredCartId(res.data.createCart.idString))
    }
  }, [queryLoading, storedCartId, data?.myCart, createCart, setStoredCartId])

  const [addToCart, addToCartState] = useMutation<
    AddToCart,
    AddToCartVariables
  >(ADD_MUTATION, {
    onCompleted: reactToChanges,
  })

  useEffect(() => {})

  const loading =
    queryLoading || addToCartState.loading || createCartState.loading
  const cartId = data?.myCart?.idString ?? data?.cart?.idString

  return [
    data?.myCart ?? data?.cart,
    {
      loading,
      addToCart: (productId: number, quantity = 1) =>
        addToCart({
          variables: {
            cartId,
            productId,
            quantity,
          },
        }),
      addToCartState,
    },
  ]
}

export default useCart
