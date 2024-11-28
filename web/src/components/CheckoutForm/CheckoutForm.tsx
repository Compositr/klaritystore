import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from 'src/auth'

import { Button } from '../ui/Button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import H3 from '../ui/typography/H3'
import Small from '../ui/typography/Small'

const SHORT_MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const

const LONG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

const MONTHS: [(typeof SHORT_MONTHS)[number], (typeof LONG_MONTHS)[number]][] =
  SHORT_MONTHS.map((short, index) => [short, LONG_MONTHS[index]])

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),

  cardNumber: z
    .string()
    .transform((a) => a.replaceAll(' ', ''))
    .pipe(
      z
        .string()
        .length(16, 'Please enter a valid card number')
        .regex(/^\d{16}$/, "Card number can't contain letters")
    ),
  cardName: z.string().min(1, 'Please enter the name on the card'),
  cardExpiryMonth: z.enum(SHORT_MONTHS, {
    message: 'Please choose a valid month',
  }),
  cardExpiryYear: z.coerce
    .number()
    .min(new Date().getFullYear(), 'Card expiry year must be in the future'),
  cardCvc: z.string().min(3, 'Please enter the card CVC'),

  shippingFirst: z.string().min(1, 'Please enter your first name'),
  shippingLast: z.string().min(1, 'Please enter your last name'),
  shipping1: z.string().min(1, 'Please enter your address'),
  shipping2: z
    .string()
    .min(1, 'Please enter a valid second address line')
    .optional(),
})

const CheckoutForm = () => {
  const { currentUser } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser?.email ?? '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <H3>Contact</H3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              {currentUser?.email && (
                <FormDescription>
                  This may be autofilled from your account details
                </FormDescription>
              )}
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

        <H3>Billing</H3>
        <div className="rounded-md border">
          <div className="flex items-center gap-2 border-b p-4">
            <CreditCard /> <Small>Card Details</Small>
            <div className="flex flex-1 items-center justify-end">
              <Lock className="text-green-500" />
            </div>
          </div>
          <div className="space-y-2 p-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="4444 3333 2222 1111"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-4 lg:mb-0 lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="cardExpiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel aria-label="Month">Expiry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MONTHS.map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardExpiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel aria-label="Expiry year" className="invisible">
                        Expiry Year
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="cardExpiryYear"
                          type="number"
                          placeholder="YYYY"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="cardCvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Code</FormLabel>
                      <FormControl>
                        <Input
                          id="cardCvc"
                          type="text"
                          placeholder="321"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <H3>Shipping</H3>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="shippingFirst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    id="shippingFirst"
                    type="text"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingLast"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    id="shippingLast"
                    type="text"
                    placeholder=""
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
          name="shipping1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input id="shipping1" type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shipping2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormDescription>Optional</FormDescription>
              <FormControl>
                <Input id="shipping2" type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 w-full">
          Pay
        </Button>
      </form>
    </Form>
  )
}

export default CheckoutForm
