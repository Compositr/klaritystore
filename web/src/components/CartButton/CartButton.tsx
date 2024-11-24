import { ShoppingCart } from 'lucide-react'

import useCart from 'src/hooks/useCart'

import { Button } from '../ui/Button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/Sheet'
import P from '../ui/typography/P'

const CartButton = () => {
  const [cart] = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>Shopping Cart</SheetHeader>
        {!cart?.items.length && <P>Your cart is currently empty.</P>}
      </SheetContent>
    </Sheet>
  )
}

export default CartButton
