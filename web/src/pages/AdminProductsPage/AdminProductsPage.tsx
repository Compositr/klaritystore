import { Metadata } from '@redwoodjs/web'

import ProductsCell from 'src/components/ProductsCell'
import H3 from 'src/components/ui/typography/H3'

const AdminProductsPage = () => {
  return (
    <>
      <Metadata title="Manage Products" />

      <div className="mb-4">
        <H3>Manage Products</H3>
      </div>
      <ProductsCell />
    </>
  )
}

export default AdminProductsPage
