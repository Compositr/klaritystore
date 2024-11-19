import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { useToast } from 'src/hooks/useToast'

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

const formSchema = z.object({
  currentPassword: z.string().min(1, 'Password must be at least 1 character'),
  newPassword: z.string().min(1, 'Password must be at least 1 character'),
  newPasswordConfirmation: z
    .string()
    .min(1, 'Password must be at least 1 character'),
})

const MUTATION = gql`
  mutation ChangePasswordMutation($input: ChangePasswordInput!) {
    changeMyPassword(input: $input)
  }
`

const ChangePasswordForm = () => {
  const { reauthenticate, logOut } = useAuth()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted: () => {
      toast({
        title: 'Password successfully changed!',
        description: 'Please log back in with your new password.',
      })

      reauthenticate().then(() => logOut())
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.clearErrors()

    if (values.newPassword !== values.newPasswordConfirmation) {
      form.setError('newPasswordConfirmation', {
        type: 'manual',
        message: 'Passwords do not match',
      })
      return
    }

    try {
      await mutate({
        variables: {
          input: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
      })
    } catch (error) {
      form.setError('currentPassword', {
        type: 'manual',
        message: error.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-2"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPasswordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  id="newPasswordConfirmation"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {!loading && 'Change Password'}
          {loading && (
            <>
              <Loader className="animate-spin" />
              <span>Updating...</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm
