import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CategoriesQuery,
  CategoriesQueryVariables,
  CreateProductMutation,
  CreateProductMutationVariables,
} from 'types/graphql'
import { z } from 'zod'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useToast } from 'src/hooks/useToast'
import { zImage } from 'src/lib/zod'

import LoadingButton from '../LoadingButton/LoadingButton'
import ProductCard from '../ProductCard/ProductCard'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
import { Input } from '../ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import H3 from '../ui/typography/H3'

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must have at least 1 character')
    .max(50, 'Product name must not exceed 50 characters'),
  price: z.coerce
    .number()
    .min(0.01, 'Price must be at least 1 cent')
    .max(9999, 'Price cannot exceed 9999'),
  description: z
    .string()
    .max(500, 'Product description cannot exceed 500 characters'),
  specifications: z
    .string()
    .max(500, 'Product specifications cannot exceed 500 characters'),
  categoryId: z.string().min(1, 'Category must be selected'),
  image: zImage,
})

const MUTATION = gql`
  mutation CreateProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      idInt
      name
      price
      description
    }
  }
`

const QUERY = gql`
  query CategoriesQuery {
    categories {
      idString
      name
    }
  }
`

const ProductForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      specifications: '',
      categoryId: '',
    },
  })

  const [mutate, { loading: mutLoading }] = useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(MUTATION, {
    onCompleted: (product) => {
      toast({
        title: 'Product created',
        description: `Product "${product.createProduct.name}" with ID #${product.createProduct.idInt} has been created`,
      })

      form.reset({
        name: '',
        price: 0,
        description: '',
        specifications: '',
        categoryId: '',
        image: undefined,
      })
    },
    onError: (error) => {
      toast({
        title: 'Product creation failed',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const { data, loading: queryLoading } = useQuery<
    CategoriesQuery,
    CategoriesQueryVariables
  >(QUERY)

  const loading = mutLoading || queryLoading

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values)
    await mutate({
      variables: {
        input: {
          name: values.name,
          price: values.price,
          description: values.description,
          specifications: values.specifications,
          categoryId: values.categoryId,
          image: values.image,
        },
      },
    })
  }

  const [previewImageSrc, setPreviewImageSrc] = React.useState<
    string | undefined
  >(undefined)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
      <div>
        <div className="mb-2">
          <H3>Create new Product</H3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Fancy Notebook"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.categories.map((category) => (
                        <SelectItem
                          key={category.idString}
                          value={category.idString}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="number"
                      placeholder="0.00"
                      step=".01"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Write up to 500 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specifications</FormLabel>
                  <FormControl>
                    <Textarea
                      id="specifications"
                      placeholder="Write up to 500 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Image"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        onChange(event.target.files && event.target.files[0])

                        const fileReader = new FileReader()

                        fileReader.onload = (event) => {
                          setPreviewImageSrc(event.target?.result as string)
                        }

                        const image = form.getValues().image
                        if (image)
                          fileReader.readAsDataURL(form.getValues().image)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              className="w-full"
              loading={loading}
              loadingMessage="Creating Product..."
            >
              Create Product
            </LoadingButton>
          </form>
        </Form>
      </div>
      <div>
        <div className="mb-2">
          <H3>Product Preview</H3>
        </div>
        <div className="md:grid md:grid-cols-2">
          <div className="col-span-1 rounded-lg border p-8">
            <ProductCard
              product={{
                idInt: 1,
                name: form.getValues().name ?? 'Product Name',
                price: form.getValues().price ?? 0,
                image: previewImageSrc,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
