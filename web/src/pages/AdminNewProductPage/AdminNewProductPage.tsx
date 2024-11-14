import { Metadata } from '@redwoodjs/web'

import ProductForm from 'src/components/ProductForm/ProductForm'

const AdminNewProductPage = () => {
  return (
    <>
      <Metadata title="New Product" description="Create a new product" />
      <div className="">
        <ProductForm />
      </div>
    </>
  )
}

export default AdminNewProductPage
