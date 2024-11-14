import { Metadata } from '@redwoodjs/web'

import ProductsCell from 'src/components/ProductsCell'

const AdminProductsPage = () => {
  return (
    <>
      <Metadata title="Manage Products" />

      <ProductsCell />
    </>
  )
}

export default AdminProductsPage
