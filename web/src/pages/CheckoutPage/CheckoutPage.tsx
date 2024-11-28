import { Metadata } from '@redwoodjs/web'

import CheckoutForm from 'src/components/CheckoutForm/CheckoutForm'
import CurrencyFormat from 'src/components/CurrencyFormat/CurrencyFormat'
import Large from 'src/components/ui/typography/Large'
import Muted from 'src/components/ui/typography/Muted'
import Small from 'src/components/ui/typography/Small'
import useCart from 'src/hooks/useCart'

const CheckoutPage = () => {
  const [cart, { cartTotal }] = useCart()

  return (
    <>
      <Metadata title="Checkout" description="Checkout and pay" />

      <div className="grid min-h-screen w-screen grid-cols-1 md:grid-cols-2">
        <div className="p-8">
          <div>
            <div className="grid w-full auto-rows-fr gap-2">
              {cart?.items.map((item) => (
                <div
                  className="flex items-center gap-4 rounded-md border p-4"
                  key={item.product.idInt}
                >
                  <div className="relative">
                    <img
                      className="h-full w-full rounded-md object-cover"
                      src={item.product.image ?? 'https://placehold.co/100'}
                      alt={`${item.product.name}`}
                    />
                    <div className="absolute -right-3 -top-3 flex items-center justify-center rounded-full bg-primary px-2 py-1">
                      <span className="text-sm text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex-1">
                      <Small>
                        <CurrencyFormat value={item.product.price} />
                      </Small>
                      <Large>{item.product.name}</Large>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <div className="flex-1">
                <Large>Total</Large>
              </div>
              <div>
                <CurrencyFormat value={cartTotal + 7} />
              </div>
            </div>
            <div>
              <Muted>
                Including <CurrencyFormat value={7} /> of flat-rate shipping
              </Muted>
            </div>
          </div>
        </div>
        <div className="border-t p-8 md:border-l md:border-t-0 md:shadow-lg">
          <CheckoutForm />
        </div>
      </div>
    </>
  )
}

export default CheckoutPage
