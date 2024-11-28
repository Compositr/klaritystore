import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
} from 'types/graphql'
import { z } from 'zod'

import { useMutation } from '@redwoodjs/web'

import { useToast } from 'src/hooks/useToast'
import { zImage } from 'src/lib/zod'

import LoadingButton from '../LoadingButton/LoadingButton'
import { AspectRatio } from '../ui/AspectRatio'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
import { Input } from '../ui/Input'

const formSchema = z.object({
  idString: z
    .string()
    .min(1, 'Category ID must have at least 1 character')
    .max(50, 'Category ID must not exceed 50 characters')
    .refine((s) => !s.includes(' '), 'Spaces not permitted in Category ID'),

  name: z.string().min(1, 'Category name must have at least 1 character'),
  description: z
    .string()
    .min(1, 'Category description must have at least 1 character'),
  image: zImage,
})

const MUTATION = gql`
  mutation CreateCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      idString
      name
      description
    }
  }
`

const CategoryForm = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      idString: '',
      name: '',
      description: '',
    },
  })

  const [mutate, { loading }] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(MUTATION, {
    onCompleted: (category) => {
      toast({
        title: 'Category created',
        description: `Category "${category.createCategory.name}" has been created`,
      })

      form.reset({
        description: '',
        idString: '',
        image: undefined,
        name: '',
      })
    },
    onError: (error) => {
      toast({
        title: 'Category creation failed',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  async function onSubmit(input: z.infer<typeof formSchema>) {
    await mutate({
      variables: {
        input: {
          idString: input.idString,
          name: input.name,
          description: input.description,
          image: input.image,
        },
      },
    })
  }

  const [previewImageSrc, setPreviewImageSrc] = React.useState<
    string | undefined
  >(undefined)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:max-w-[50vw]"
      >
        <FormField
          control={form.control}
          name="idString"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category ID</FormLabel>
              <FormDescription>
                Spaces not permitted. Lowercase is recommended.
              </FormDescription>
              <FormControl>
                <Input
                  id="idString"
                  type="text"
                  placeholder="papers-please"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input id="name" type="text" placeholder="Papers" {...field} />
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
              <FormLabel>Category Description</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  type="text"
                  placeholder="Write a short and sweet description"
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
                    if (image) fileReader.readAsDataURL(form.getValues().image)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {previewImageSrc && (
          <img
            src={previewImageSrc}
            alt="Preview"
            className="my-4 block w-full rounded-md shadow-inner"
          />
        )}
        {!previewImageSrc && (
          <AspectRatio
            ratio={16 / 9}
            className="flex items-center justify-center rounded-md bg-muted shadow-inner"
          >
            <span>Picture Preview</span>
          </AspectRatio>
        )}
        <LoadingButton
          loading={loading}
          loadingMessage="Processing..."
          className="w-full"
          type="submit"
        >
          Create
        </LoadingButton>
      </form>
    </Form>
  )
}

export default CategoryForm
