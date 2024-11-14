import { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUpDown,
  ClipboardCopy,
  MoreHorizontal,
  Pencil,
  Trash,
} from 'lucide-react'
import type { ProductsQuery, ProductsQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/AlertDialog'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { DataTable } from '../ui/DataTable'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/Dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu'

export const QUERY: TypedDocumentNode<ProductsQuery, ProductsQueryVariables> =
  gql`
    query ProductsQuery {
      products {
        idInt
        name
        description
        price
        category {
          idString
          name
        }
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const columns: ColumnDef<
  CellSuccessProps<ProductsQuery>['products'][number]
>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate') ||
          false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'idInt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="-ml-3 h-4 w-4" />
          Product ID
        </Button>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <ArrowUpDown className="-ml-3 h-4 w-4" />
          Price
        </Button>
      )
    },
    cell: ({ row }) => (
      <CurrencyFormat value={parseFloat(row.getValue('price'))} />
    ),
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    // called Cell so useState does not complain it is not in a component
    cell: function Cell({ row }) {
      const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
      const [modifyDialogOpen, setModifyDialogOpen] = React.useState(false)

      const product = row.original

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
                onClick={() =>
                  navigator.clipboard.writeText(product.idInt.toString())
                }
              >
                <ClipboardCopy />
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(product.description)
                }
              >
                <ClipboardCopy />
                Copy product description
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                aria-controls={`${product.idInt}-modify-dialog`}
                onClick={() => setModifyDialogOpen(true)}
              >
                <Pencil /> Modify product
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-controls={`${product.idInt}-delete-dialog`}
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash /> Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialogs */}
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={(o) => setDeleteDialogOpen(o)}
          >
            <AlertDialogContent id={`${product.idInt}-delete-dialog`}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are sure you want to delete {product.name}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this product.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  {/* TODO: Implement Deleting */}
                  <Button variant="destructive">Delete</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog
            open={modifyDialogOpen}
            onOpenChange={(o) => setModifyDialogOpen(o)}
          >
            <DialogContent id={`${product.idInt}-modify-dialog`}>
              <DialogHeader>
                <DialogTitle>Edit {product.name}</DialogTitle>
                <DialogDescription>
                  Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              {/* TODO: Implement editing */}
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setModifyDialogOpen(false)}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]

export const Success = ({ products }: CellSuccessProps<ProductsQuery>) => {
  return <DataTable columns={columns} data={products} />
}