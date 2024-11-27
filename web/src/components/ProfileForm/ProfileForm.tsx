import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UpdateMeMutation, UpdateMeMutationVariables } from 'types/graphql'
import { z } from 'zod'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { useToast } from 'src/hooks/useToast'

import LoadingButton from '../LoadingButton/LoadingButton'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
import { Input } from '../ui/Input'

const formSchema = z.object({
  firstName: z.string().min(1, 'First name must have at least 1 character'),
  lastName: z.string().min(1, 'Last name must have at least 1 character'),
  email: z.string().email(),
})

const MUTATION = gql`
  mutation UpdateMeMutation($input: UpdateUserInput!) {
    updateMe(input: $input) {
      firstName
      lastName
      email
    }
  }
`

const ProfileForm = () => {
  const { currentUser } = useAuth()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
    },
  })

  const [mutate, { loading }] = useMutation<
    UpdateMeMutation,
    UpdateMeMutationVariables
  >(MUTATION, {
    onCompleted: () =>
      toast({
        description: 'Profile updated',
      }),
    onError: (error) =>
      toast({
        description: error.message,
        variant: 'destructive',
        title: 'There was an error updating your profile',
      }),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutate({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        },
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-2"
      >
        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.org"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={loading}
          type="submit"
          loadingMessage="Saving..."
        >
          Save Changes
        </LoadingButton>
      </form>
    </Form>
  )
}

export default ProfileForm
