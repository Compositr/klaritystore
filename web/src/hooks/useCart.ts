import {
  AddToCart,
  AddToCartVariables,
  CreateCart,
  CreateCartVariables,
  GetCart,
  GetCartVariables,
  ModifyCartItem,
  ModifyCartItemVariables,
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
          image
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
          image
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

const MOD_MUTATION = gql`
  mutation ModifyCartItem($cartId: String!, $productId: Int!, $quantity: Int!) {
    updateCartItem(
      cartId: $cartId
      productId: $productId
      input: { quantity: $quantity }
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

    cartItems: number
    cartTotal: number

    addToCart: (productId: number, quantity?: number) => void
    addToCartState: MutationOperationResult<AddToCart, AddToCartVariables>['1']

    modifyQuantity: (productId: number, quantity: number) => void
    modifyQuantityState: MutationOperationResult<
      ModifyCartItem,
      ModifyCartItemVariables
    >['1']
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
    errorPolicy: 'all',
  })

  // React to changes in the cart data (e.g. we added an item)
  function reactToChanges() {
    client.refetchQueries({
      include: [QUERY],
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

    // If:
    //  there is no stored cart id
    //  or there is a stored cart id but no cart data
    if ((!storedCartId || (storedCartId && !data?.cart)) && !data?.myCart) {
      // Create cart if no cart exists
      createCart().then((res) => setStoredCartId(res.data.createCart.idString))
    }
  }, [
    queryLoading,
    storedCartId,
    data?.cart,
    data?.myCart,
    createCart,
    setStoredCartId,
  ])

  const [addToCartMut, addToCartState] = useMutation<
    AddToCart,
    AddToCartVariables
  >(ADD_MUTATION, {
    onCompleted: reactToChanges,
  })

  const [modifyQuantityMut, modifyQuantityState] = useMutation<
    ModifyCartItem,
    ModifyCartItemVariables
  >(MOD_MUTATION, {
    onCompleted: reactToChanges,
  })

  const loading =
    queryLoading ||
    addToCartState.loading ||
    createCartState.loading ||
    modifyQuantityState.loading
  const cart = data?.myCart ?? data?.cart
  const cartId = cart?.idString

  const addToCart = (productId: number, quantity = 1) => {
    const existingItem = cart?.items.find((i) => i.product.idInt === productId)
    if (existingItem) {
      modifyQuantity(productId, existingItem.quantity + quantity)
      return
    }

    addToCartMut({
      variables: {
        cartId,
        productId,
        quantity,
      },
    })
  }

  const modifyQuantity = (productId: number, quantity: number) => {
    if (!cart.items.some((i) => i.product.idInt === productId)) {
      addToCart(productId, quantity)
      return
    }

    modifyQuantityMut({
      variables: {
        cartId,
        productId,
        quantity,
      },
    })
  }

  const cartItems =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0
  const cartTotal = cart?.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  return [
    cart,
    {
      loading,

      cartItems,
      cartTotal,

      addToCart,
      addToCartState,

      modifyQuantity,
      modifyQuantityState,
    },
  ]
}

export default useCart
