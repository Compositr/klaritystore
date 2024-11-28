import { Loader, Minus, Plus, ShoppingCart, X } from 'lucide-react'

import useCart from 'src/hooks/useCart'

import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import LoadingButton from '../LoadingButton/LoadingButton'
import { Button } from '../ui/Button'
import { ScrollArea } from '../ui/ScrollArea'
import { Separator } from '../ui/Separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from '../ui/Sheet'
import Large from '../ui/typography/Large'
import Muted from '../ui/typography/Muted'
import P from '../ui/typography/P'
import Small from '../ui/typography/Small'

const CartButton = () => {
  const [cart, { cartItems, cartTotal, loading, modifyQuantity }] = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 pb-6">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Shopping Cart ({cartItems})</SheetTitle>
        </SheetHeader>
        {!cart?.items.length && (
          <div className="p-6">
            <P>Your cart is currently empty.</P>
          </div>
        )}
        <div className="my-4 flex h-full flex-col gap-2">
          <ScrollArea className="px-6">
            <div className="mb-4 flex">
              <div className="grid w-full auto-rows-fr gap-2">
                {cart?.items.map((item) => (
                  <div
                    className="grid grid-cols-3 gap-4 rounded-md border p-4"
                    key={item.product.idInt}
                  >
                    <div className="col-span-1">
                      <img
                        className="h-full w-full rounded-md object-cover"
                        src={item.product.image ?? 'https://placehold.co/100'}
                        alt={`${item.product.name}`}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col gap-1">
                      <div className="flex-1">
                        <Small>
                          <b>
                            <CurrencyFormat value={item.product.price} />
                          </b>
                        </Small>
                        <Large>{item.product.name}</Large>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex grow-0 items-center gap-1 rounded-md border p-0.5 align-middle">
                          <Button
                            size="icon"
                            disabled={loading || item.quantity === 1}
                            variant="ghost"
                            onClick={() => {
                              modifyQuantity(
                                item.product.idInt,
                                item.quantity - 1
                              )
                            }}
                            aria-label="Decrease quantity"
                          >
                            <Minus />
                          </Button>
                          <span>
                            {!loading && item.quantity}
                            {loading && (
                              <Loader className="h-4 w-4 animate-spin" />
                            )}
                          </span>
                          <Button
                            size="icon"
                            disabled={loading}
                            variant="ghost"
                            onClick={() => {
                              modifyQuantity(
                                item.product.idInt,
                                item.quantity + 1
                              )
                            }}
                            aria-label="Increase quantity"
                          >
                            <Plus />
                          </Button>
                        </div>
                        <div className="rounded-md border p-0.5">
                          <LoadingButton
                            loading={loading}
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              modifyQuantity(item.product.idInt, 0)
                            }}
                            aria-label="Remove item from cart"
                          >
                            <X />
                          </LoadingButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          {/* Spacer */}
          <div className="flex-1"></div>
          <div className="mb-8 border-t p-4">
            <div className="mb-2 flex">
              <div className="flex-1">
                <P>Subtotal</P>
              </div>
              <div>
                <Large>
                  <CurrencyFormat value={cartTotal} />
                </Large>
              </div>
            </div>
            <Separator className="my-2" />
            <Muted>Shipping is calculated at checkout</Muted>
            <LoadingButton loading={loading} className="mt-4 w-full">
              Checkout
            </LoadingButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartButton
