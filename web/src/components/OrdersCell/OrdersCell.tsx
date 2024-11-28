import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ClipboardCopy, X } from 'lucide-react'
import type {
  DeleteOrderMutation,
  DeleteOrderMutationVariables,
  OrdersQuery,
  OrdersQueryVariables,
} from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  type TypedDocumentNode,
  useMutation,
} from '@redwoodjs/web'

import { useToast } from 'src/hooks/useToast'

import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/AlertDialog'
import { Button } from '../ui/Button'
import { DataTable } from '../ui/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu'
import P from '../ui/typography/P'

export const QUERY: TypedDocumentNode<OrdersQuery, OrdersQueryVariables> = gql`
  query OrdersQuery {
    orders {
      idString
      items {
        product {
          name
          price
        }
        quantity
      }
      user {
        idString
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <P>There are no orders at the moment!</P>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrderMutation($id: String!) {
    deleteOrder(idString: $id) {
      idString
    }
  }
`

const columns: ColumnDef<CellSuccessProps<OrdersQuery>['orders'][number]>[] = [
  {
    accessorKey: 'idString',
    header: 'Order ID',
  },
  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) =>
      (
        row.getValue('items') as {
          product: {
            name: string
            price: number
          }
          quantity: number
        }[]
      ).map(({ product, quantity }) => (
        <div key={product.name}>
          {product.name} x {quantity} @ ${product.price}
        </div>
      )),
  },
  {
    id: 'total',
    header: 'Total Paid',
    cell: ({ row }) => (
      <CurrencyFormat
        value={
          (
            row.getValue('items') as {
              product: {
                price: number
              }
              quantity: number
            }[]
          ).reduce((acc, { product, quantity }) => {
            return acc + product.price * quantity
          }, 0) + 7
        }
      />
    ),
  },
  {
    id: 'actions',
    // called Cell so useState does not complain it is not in a component
    cell: function Cell({ row }) {
      const { toast } = useToast()

      const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

      const order = row.original

      const [deleteMut, { client, loading: deleteMutLoading }] = useMutation<
        DeleteOrderMutation,
        DeleteOrderMutationVariables
      >(DELETE_ORDER_MUTATION, {
        onCompleted: () => {
          setDeleteDialogOpen(false)
          toast({
            title: 'Order cancelled',
          })

          client.refetchQueries({
            include: [QUERY],
          })
        },
        onError: (error) => {
          toast({
            title: 'Error cancelling order',
            description: error.message,
            variant: 'destructive',
          })
        },
      })

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.idString)}
              >
                <ClipboardCopy />
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                aria-controls={`${order.idString}-delete-dialog`}
                onClick={() => setDeleteDialogOpen(true)}
              >
                <X /> Cancel order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialogs */}
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={(o) => setDeleteDialogOpen(o)}
          >
            <AlertDialogContent id={`${order.idString}-delete-dialog`}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are sure you want to cancel the order with the ID{' '}
                  {order.idString}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently cancel the
                  order.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    disabled={deleteMutLoading}
                    variant="destructive"
                    onClick={async () => {
                      deleteMut({ variables: { id: order.idString } })
                    }}
                  >
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]

export const Success = ({ orders }: CellSuccessProps<OrdersQuery>) => {
  return <DataTable data={orders} columns={columns} />
}
