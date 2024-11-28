import { ColumnDef } from '@tanstack/react-table'
import { ClipboardCopy, MoreHorizontal, Trash } from 'lucide-react'
import type {
  AdminCategoriesQuery,
  AdminCategoriesQueryVariables,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
} from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  type TypedDocumentNode,
  useMutation,
} from '@redwoodjs/web'

import { useToast } from 'src/hooks/useToast'

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
import { DataTable } from '../ui/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu'

export const QUERY: TypedDocumentNode<
  AdminCategoriesQuery,
  AdminCategoriesQueryVariables
> = gql`
  query AdminCategoriesQuery {
    categories {
      idString
      name
      description
      image
      products {
        idInt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: String!) {
    deleteCategory(idString: $id) {
      idString
      name
    }
  }
`

const columns: ColumnDef<
  CellSuccessProps<AdminCategoriesQuery>['categories'][number]
>[] = [
  {
    accessorKey: 'idString',
    header: 'Category ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) =>
      row.getValue('image') ? (
        <img
          src={row.getValue('image')}
          alt={row.getValue('name')}
          className="h-8 w-8 rounded-md object-cover"
        />
      ) : (
        <span>No image</span>
      ),
  },
  {
    accessorKey: 'products',
    header: '№ Products',
    cell: ({ row }) => (row.getValue('products') as unknown[]).length,
  },
  {
    id: 'actions',
    // called Cell so useState does not complain it is not in a component
    cell: function Cell({ row }) {
      const { toast } = useToast()

      const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

      const category = row.original

      const [deleteMut, { client, loading: deleteMutLoading }] = useMutation<
        DeleteCategoryMutation,
        DeleteCategoryMutationVariables
      >(DELETE_CATEGORY_MUTATION, {
        onCompleted: () => {
          setDeleteDialogOpen(false)
          toast({
            title: 'Category deleted',
            description: `${category.name} was deleted successfully.`,
          })

          client.refetchQueries({
            include: [QUERY],
          })
        },
        onError: (error) => {
          toast({
            title: 'Error deleting category',
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
                onClick={() => navigator.clipboard.writeText(category.idString)}
              >
                <ClipboardCopy />
                Copy category ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(category.description)
                }
              >
                <ClipboardCopy />
                Copy category description
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                aria-controls={`${category.idString}-delete-dialog`}
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash /> Delete category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialogs */}
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={(o) => setDeleteDialogOpen(o)}
          >
            <AlertDialogContent id={`${category.idString}-delete-dialog`}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are sure you want to delete {category.name}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this category and all of its products!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    disabled={deleteMutLoading}
                    variant="destructive"
                    onClick={async () => {
                      deleteMut({ variables: { id: category.idString } })
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

export const Success = ({
  categories,
}: CellSuccessProps<AdminCategoriesQuery>) => {
  return <DataTable columns={columns} data={categories} />
}
