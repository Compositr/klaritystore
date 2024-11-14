import { Metadata } from '@redwoodjs/web'

import ProductPageCell from 'src/components/ProductPageCell'

interface ProductPageProps {
  idInt: number
}

const ProductPage = ({ idInt }: ProductPageProps) => {
  return (
    <>
      <Metadata title="Product" description="Product page" />
      <ProductPageCell id={idInt} />
    </>
  )
}

export default ProductPage
