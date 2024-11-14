import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import ProductCard from '../ProductCard/ProductCard'
import { Button } from '../ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
import { Input } from '../ui/Input'
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
})

const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

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
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Textarea
                      id="name"
                      placeholder="Write up to 500 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <div className="mb-2">
          <H3>Product Preview</H3>
        </div>
        <ProductCard
          product={{
            idInt: 1,
            name: form.getValues().name ?? '...',
            price: form.getValues().price ?? 0,
          }}
        />
      </div>
    </div>
  )
}

export default ProductForm
