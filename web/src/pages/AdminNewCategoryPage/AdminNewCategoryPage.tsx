import { Metadata } from '@redwoodjs/web'

import CategoryForm from 'src/components/CategoryForm/CategoryForm'
import H3 from 'src/components/ui/typography/H3'

const AdminNewCategoryPage = () => {
  return (
    <>
      <Metadata title="New Category" />

      <div className="mb-4">
        <H3>Create new Category</H3>
      </div>
      <CategoryForm />
    </>
  )
}

export default AdminNewCategoryPage
