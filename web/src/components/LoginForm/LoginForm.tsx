import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from 'src/auth'

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
  email: z.string().email(),
  password: z.string(),
})

interface LoginFormProps {
  onSuccess?: () => void
}
const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { logIn } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.clearErrors()

    const user = await logIn({
      username: values.email,
      password: values.password,
    })

    if (user.error) {
      form.setError('password', {
        message: user.error ?? 'Unknown error occured',
      })

      return
    }

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:space-y-4"
      >
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input id="password" type="password" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
