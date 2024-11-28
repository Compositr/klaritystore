import { Metadata } from '@redwoodjs/web'

import CategoriesCell from 'src/components/CategoriesCell'
import H3 from 'src/components/ui/typography/H3'

const AdminCategoriesPage = () => {
  return (
    <>
      <Metadata title="Manage Categories" />

      <div className="mb-4">
        <H3>Manage Categories</H3>
      </div>
      <CategoriesCell />
    </>
  )
}

export default AdminCategoriesPage
