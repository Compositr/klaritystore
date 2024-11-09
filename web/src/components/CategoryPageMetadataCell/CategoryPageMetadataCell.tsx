import type {
  CategoryPageMetadataQuery,
  CategoryPageMetadataQueryVariables,
} from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  type TypedDocumentNode,
  Metadata,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  CategoryPageMetadataQuery,
  CategoryPageMetadataQueryVariables
> = gql`
  query CategoryPageMetadataQuery($idString: String!) {
    category(idString: $idString) {
      idString
      name
    }
  }
`

export const Loading = () => <></>

export const Empty = () => <Metadata title="404 Not Found" />
export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  category,
}: CellSuccessProps<CategoryPageMetadataQuery>) => {
  return (
    <Metadata
      title={category.name}
      description={`Products in the ${category.name} category`}
    />
  )
}
