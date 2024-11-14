import { Link, routes } from '@redwoodjs/router'

import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import H3 from '../ui/typography/H3'
import Small from '../ui/typography/Small'

interface ProductCardProps {
  product: {
    idInt: number
    name: string
    price: number
  }
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
      <div className="overflow-clip">
        <Link
          to={routes.product({
            idInt: product.idInt,
          })}
        >
          <img
            src="https://placehold.co/500"
            className="w-full"
            alt={product.name}
          />
        </Link>
      </div>
      <div className="mt-2">
        <Small>
          <CurrencyFormat value={product.price} />
        </Small>
        <H3>
          <Link
            to={routes.product({
              idInt: product.idInt,
            })}
            className="leading-loose hover:underline"
          >
            {product.name}
          </Link>
        </H3>
      </div>
    </div>
  )
}

export default ProductCard
