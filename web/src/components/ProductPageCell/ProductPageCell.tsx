import type {
  FindProductPageQuery,
  FindProductPageQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import NotFound from '../NotFound/NotFound'
import { Button } from '../ui/Button'
import H1 from '../ui/typography/H1'
import H3 from '../ui/typography/H3'
import Large from '../ui/typography/Large'

export const QUERY: TypedDocumentNode<
  FindProductPageQuery,
  FindProductPageQueryVariables
> = gql`
  query FindProductPageQuery($id: Int!) {
    product(idInt: $id) {
      idInt
      name
      price
      description
      specifications
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <NotFound />

export const Failure = ({
  error,
}: CellFailureProps<FindProductPageQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  product,
}: CellSuccessProps<FindProductPageQuery, FindProductPageQueryVariables>) => {
  return (
    <div className="container mt-16 flex flex-col gap-8 md:grid md:grid-cols-3">
      <div className="col-span-2 w-full overflow-clip">
        <img
          src="https://placehold.co/800"
          className="w-full rounded-md"
          alt={product.name}
        />
      </div>
      <div className="w-full">
        <H1>{product.name}</H1>
        <div className="relative mt-8 rounded-xl border p-6">
          <div className="absolute -top-4 left-4 bg-background px-2">
            <Large>Price</Large>
          </div>
          <H3>
            <CurrencyFormat value={product.price} />
          </H3>
        </div>
        <div className="mt-4 w-full">
          <Button className="w-full">Add to Cart</Button>
        </div>
        <div className="relative mt-8 rounded-xl border p-6">
          <div className="absolute -top-4 left-4 bg-background px-2">
            <Large>Description</Large>
          </div>
          <p className="leading-7">{product.description}</p>
        </div>
        <div className="relative mt-6 rounded-xl border p-6">
          <div className="absolute -top-4 left-4 bg-background px-2">
            <Large>Specifications</Large>
          </div>
          <p className="leading-7">{product.specifications}</p>
        </div>
      </div>
    </div>
  )
}